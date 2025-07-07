# Ocean Health Impact Configuration System

This system allows you to adjust how each choice in the game affects the three ocean health metrics: Ecosystem, Economic, and Community health.

## How to Edit Impact Values

1. **Edit the CSV file**: Open `impact_configuration.csv` in any spreadsheet program (Excel, Google Sheets, etc.)

2. **Understand the columns**:
   - `Scenario ID`: Internal identifier for the scenario
   - `Scenario Title`: Human-readable scenario name
   - `Choice ID`: Internal identifier for the choice
   - `Choice Text`: The actual choice text shown to players
   - `Language`: Language code (en, fr, mi)
   - `Current Impact Type`: Legacy impact type (positive/negative/neutral)
   - `Ecosystem Impact (-50 to +50)`: How much this choice affects ecosystem health
   - `Economic Impact (-50 to +50)`: How much this choice affects economic health  
   - `Community Impact (-50 to +50)`: How much this choice affects community health

3. **Edit impact values**: Change the numbers in the last three columns
   - Range: -50 (very negative) to +50 (very positive)
   - 0 = neutral impact
   - Positive numbers improve that health metric
   - Negative numbers reduce that health metric

4. **Realistic impact examples**:
   - Banning plastic: Ecosystem +25, Economic -5, Community +15
   - Unlimited fishing: Ecosystem -35, Economic +15, Community -15
   - Green development: Ecosystem +20, Economic -5, Community +15

## Importing Your Changes

After editing the CSV file:

1. **Save as CSV format** (not Excel format)
2. **Replace the existing file**: Overwrite `impact_configuration.csv` in the project
3. **Add import functionality**: The system is set up to read these values automatically

## Current Impact Logic

- **Ecosystem health** primarily affects marine species health status
- **Economic health** represents fishing industry and coastal economy impacts  
- **Community health** represents local community well-being and engagement
- Each choice can have different impacts on each health metric, making the game more realistic

## Example Scenarios

### Plastic Pollution
- **Ban plastics**: High ecosystem benefit (+25), slight economic cost (-5), good community benefit (+15)
- **Ignore problem**: Major ecosystem damage (-30), no economic change (0), community harm (-10)
- **Beach cleanup**: Moderate ecosystem benefit (+10), slight economic benefit (+5), strong community benefit (+20)

### Fishing Practices  
- **Sustainable quotas**: Good ecosystem benefit (+20), short-term economic cost (-5), moderate community benefit (+10)
- **Unlimited fishing**: Severe ecosystem damage (-35), short-term economic gain (+15), long-term community harm (-15)
- **Marine reserves**: Excellent ecosystem benefit (+30), moderate economic cost (-10), slight community benefit (+5)

This system allows for nuanced, realistic impacts that reflect the complexity of real environmental decisions.