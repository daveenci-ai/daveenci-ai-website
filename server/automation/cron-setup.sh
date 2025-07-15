#!/bin/bash
# Cron job setup for DaVeenci AI Answer Engine Optimized blog automation
# 3 posts daily: 9am, 1pm, 5pm CST

echo "🚀 Setting up DaVeenci AI Answer Engine Optimized blog automation cron jobs..."

# Get the current directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SERVER_DIR="$(dirname "$SCRIPT_DIR")"

# Create logs directory if it doesn't exist
mkdir -p "$SERVER_DIR/logs"

# Create cron job entries
CRON_FILE="/tmp/daveenci-cron"

cat > "$CRON_FILE" << CRONEOF
# DaVeenci AI Answer Engine Optimized Blog Automation - 3 posts daily
# Times are in CST (Central Standard Time)
# Content optimized for AI citation and search visibility

# Morning post - 9:00 AM CST (How-to guides optimized for AI models)
0 9 * * * cd $SERVER_DIR && node automation/blog-scheduler.js morning >> logs/automation.log 2>&1

# Afternoon post - 1:00 PM CST (Local/service content with structured data)
0 13 * * * cd $SERVER_DIR && node automation/blog-scheduler.js afternoon >> logs/automation.log 2>&1

# Evening post - 5:00 PM CST (Trends/thought leadership for AI citation)
0 17 * * * cd $SERVER_DIR && node automation/blog-scheduler.js evening >> logs/automation.log 2>&1

# Weekly log rotation - Sunday at midnight
0 0 * * 0 cd $SERVER_DIR/logs && mv automation.log automation-$(date +\%Y\%m\%d).log && touch automation.log

CRONEOF

# Install cron jobs
crontab "$CRON_FILE"

# Clean up
rm "$CRON_FILE"

echo "✅ Answer Engine Optimized cron jobs installed successfully!"
echo ""
echo "📅 Daily Schedule (CST):"
echo "  🌅 9:00 AM  - Morning: How-to guides with step-by-step instructions"
echo "  🏢 1:00 PM  - Afternoon: Local business guides with comparisons"  
echo "  🌆 5:00 PM  - Evening: Industry trends with data and predictions"
echo ""
echo "🎯 Content Optimization:"
echo "  📊 Answer Engine Optimized structure for AI citation"
echo "  🔍 SEO-optimized titles and meta descriptions"
echo "  📝 FAQ sections for direct AI model answers"
echo "  📈 Structured data with bullet points and numbered lists"
echo ""
echo "📝 Logs will be saved to: $SERVER_DIR/logs/automation.log"
echo ""
echo "🔧 Management commands:"
echo "  View cron jobs: crontab -l"
echo "  Remove cron jobs: crontab -r"
echo "  Test automation: npm run blog-test"
echo "  View logs: tail -f $SERVER_DIR/logs/automation.log"
echo ""
echo "⚠️  Prerequisites:"
echo "  ✅ Set GEMINI_API_KEY in server/.env"
echo "  ✅ Ensure database is running"
echo "  ✅ Test with: npm run blog-test"
echo ""
echo "🚀 Your blog will now generate 3 Answer Engine Optimized posts daily!"
