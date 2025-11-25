# JamAI Base Integration Guide

## Overview
This guide will help you integrate your own JamAI Base instance with your house rental website. The integration supports syncing to multiple Action Tables simultaneously.

## Prerequisites

You need the following from your JamAI Base instance:
- API Key
- Project ID
- Base URL (API endpoint)
- Table IDs (the names of your Action Tables)

## Step 1: Set Environment Variables

Add these environment variables to your Vercel project:

\`\`\`env
JAMAI_API_KEY=your_api_key_here
JAMAI_PROJECT_ID=your_project_id_here
JAMAI_BASE_URL=https://api.jamaibase.com  # Or your custom endpoint

JAMAI_TABLE_IDS=properties_knowledge,property_chat,rental_recommendations

# Legacy: Single table (used if JAMAI_TABLE_IDS is not set)
# JAMAI_TABLE_ID=properties_knowledge
\`\`\`

## Step 2: Create Action Tables in JamAI Base

Create one or more Action Tables for different purposes. For each table:

1. Go to your JamAI Base dashboard at https://cloud.jamaibase.com/
2. Navigate to your project
3. Click "Create Action Table"
4. Add the required input columns (see table below)

### Required Input Columns

| Column Name | Type | Description |
|-------------|------|-------------|
| property_id | Text | Unique property identifier |
| title_en | Text | Property title in English |
| title_ms | Text | Property title in Malay |
| location | Text | Property location |
| bedrooms | Text | Number of bedrooms |
| bathrooms | Text | Number of bathrooms |
| price | Text | Monthly rental price |
| contact | Text | Contact phone number |
| furnished | Text | Furnished status |
| image_url | Text | Property image URL |
| description | Text | Full property description |

### Recommended Table Setups

**Table 1: `properties_knowledge`**
- Purpose: General property knowledge base
- Output Column: `ai_description` with generation enabled
- AI Prompt: "Generate a detailed property description highlighting key features and location benefits"

**Table 2: `property_chat`**
- Purpose: Conversational AI assistant
- Enable RAG and link to `properties_knowledge`
- Output Column: `response` with generation enabled
- AI Prompt: "You are a helpful rental assistant. Answer questions about properties in Klang Valley"

**Table 3: `rental_recommendations`**
- Purpose: Smart property recommendations
- Output Column: `recommendation` with generation enabled
- AI Prompt: "Generate personalized recommendations for this property based on typical renter preferences"

## Step 3: Sync Properties to Multiple Tables

1. Go to your admin page at `/admin`
2. Scroll to the "JamAI Base Sync" section
3. **Select which tables to sync** (checkboxes will appear for each table in JAMAI_TABLE_IDS)
4. Click "Sync Properties"
5. Monitor the sync progress and results

The sync will:
- Fetch all properties from your Neon database
- Send them to each selected JamAI table
- Provide a detailed report of success/failures per table

## Multi-Table Benefits

Syncing to multiple tables allows you to:
- **Separate concerns**: Different tables for chat, search, recommendations
- **A/B testing**: Test different AI prompts on different tables
- **Backup**: Keep multiple copies with different configurations
- **Specialization**: Optimize each table for specific use cases

## Step 4: Use JamAI Data (Optional)

Once synced, you can:
- Query properties using JamAI's RAG capabilities
- Generate AI-enhanced property descriptions
- Build chatbots that understand your property inventory
- Create recommendation systems

## Troubleshooting

### "No JamAI tables configured"
- Set `JAMAI_TABLE_IDS` environment variable
- Format: comma-separated list (e.g., `table1,table2,table3`)

### "Missing JamAI credentials" error
- Verify `JAMAI_API_KEY` and `JAMAI_PROJECT_ID` are set
- Check that variable names match exactly

### "Failed to sync property" errors
- Verify your Action Table columns match the expected schema
- Check that your API key has write permissions
- Ensure the table names match your actual tables in JamAI

### No properties syncing
- Verify properties exist in your Neon database
- Check the browser console for detailed error messages
- Verify your JamAI Base API endpoint is accessible

### Some tables succeed, others fail
- Check that all tables have the correct column schema
- Verify each table name in JAMAI_TABLE_IDS exists in your JamAI project
- Review the detailed sync results to see which table failed

## API Endpoint

**POST** `/api/jamai/sync`

Syncs all properties from Neon database to selected JamAI Base tables.

**Request Body:**
\`\`\`json
{
  "tables": ["properties_knowledge", "property_chat"]
}
\`\`\`

**Response:**
\`\`\`json
{
  "message": "Sync completed",
  "tables": {
    "properties_knowledge": {
      "total": 100,
      "succeeded": 98,
      "failed": 2,
      "results": [...]
    },
    "property_chat": {
      "total": 100,
      "succeeded": 100,
      "failed": 0,
      "results": [...]
    }
  }
}
\`\`\`

## Support

For JamAI Base specific issues, refer to:
- https://docs.jamaibase.com
- https://cloud.jamaibase.com
