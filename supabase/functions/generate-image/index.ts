import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { positivePrompt, model = "runware:100@1", numberResults = 1, outputFormat = "WEBP" } = await req.json()
    
    const runwareApiKey = Deno.env.get('RUNWARE_API_KEY')
    if (!runwareApiKey) {
      throw new Error('RUNWARE_API_KEY not found in environment variables')
    }

    // Create WebSocket connection to Runware
    const ws = new WebSocket("wss://ws-api.runware.ai/v1")
    
    return new Promise((resolve) => {
      let authComplete = false
      const taskUUID = crypto.randomUUID()

      ws.onopen = () => {
        // First authenticate
        const authMessage = [{
          taskType: "authentication",
          apiKey: runwareApiKey,
        }]
        ws.send(JSON.stringify(authMessage))
      }

      ws.onmessage = (event) => {
        const response = JSON.parse(event.data)
        
        if (response.error || response.errors) {
          ws.close()
          resolve(new Response(JSON.stringify({ 
            error: response.errorMessage || response.errors?.[0]?.message || "An error occurred" 
          }), { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }))
          return
        }

        if (response.data) {
          response.data.forEach((item: any) => {
            if (item.taskType === "authentication" && !authComplete) {
              authComplete = true
              // Now send image generation request
              const imageMessage = [{
                taskType: "imageInference",
                taskUUID,
                model,
                width: 1024,
                height: 1024,
                numberResults,
                outputFormat,
                steps: 4,
                CFGScale: 1,
                scheduler: "FlowMatchEulerDiscreteScheduler",
                strength: 0.8,
                lora: [],
                positivePrompt,
              }]
              ws.send(JSON.stringify(imageMessage))
            } else if (item.taskType === "imageInference" && item.taskUUID === taskUUID) {
              ws.close()
              resolve(new Response(JSON.stringify({
                imageURL: item.imageURL,
                positivePrompt: item.positivePrompt,
                seed: item.seed,
                NSFWContent: item.NSFWContent
              }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
              }))
            }
          })
        }
      }

      ws.onerror = () => {
        ws.close()
        resolve(new Response(JSON.stringify({ 
          error: "Failed to connect to Runware API" 
        }), { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }))
      }

      // Timeout after 30 seconds
      setTimeout(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.close()
          resolve(new Response(JSON.stringify({ 
            error: "Request timeout" 
          }), { 
            status: 408, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }))
        }
      }, 30000)
    })

  } catch (error) {
    return new Response(JSON.stringify({ 
      error: error.message 
    }), { 
      status: 400, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    })
  }
})