const NOTION_TOKEN = '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';
const NOTION_DB_ID = '211cca79123f80a89eefceb85097f3ff';

exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${NOTION_DB_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ page_size: 100 }),
    });

    const data = await response.json();
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
