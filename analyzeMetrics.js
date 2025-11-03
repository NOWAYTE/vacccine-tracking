const fs = require('fs');
const path = require('path');
const glob = require('glob');

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  let totalLines = lines.length;
  let codeLines = 0;
  let commentLines = 0;
  let whitespaceLines = 0;

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) {
      whitespaceLines++;
    } else if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
      commentLines++;
    } else {
      codeLines++;
    }
  });

  return { totalLines, codeLines, commentLines, whitespaceLines };
}

function calculateMetrics(results) {
  const totalFiles = results.length;
  const totalLines = results.reduce((sum, res) => sum + res.totalLines, 0);
  const codeLines = results.reduce((sum, res) => sum + res.codeLines, 0);
  const commentLines = results.reduce((sum, res) => sum + res.commentLines, 0);
  const whitespaceLines = results.reduce((sum, res) => sum + res.whitespaceLines, 0);

  const avgLineLength = totalLines / totalFiles;
  const codeCommentRatio = codeLines / commentLines || 0;
  const codeWhitespaceRatio = codeLines / whitespaceLines || 0;
  const codeTotalLinesRatio = codeLines / totalLines || 0;

  return {
    totalFiles,
    totalLines,
    avgLineLength,
    codeLines,
    commentLines,
    whitespaceLines,
    codeCommentRatio,
    codeWhitespaceRatio,
    codeTotalLinesRatio,
    codeLinesPerFile: codeLines / totalFiles || 0,
    commentLinesPerFile: commentLines / totalFiles || 0,
    whitespaceLinesPerFile: whitespaceLines / totalFiles || 0,
  };
}

function generateHTML(metrics) {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Code Metrics</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    table { border-collapse: collapse; width: 100%; margin-top: 20px; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f4f4f4; }
  </style>
</head>
<body>
  <h1>Code Metrics Report</h1>
  <table>
    <thead>
      <tr>
        <th>Metric</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Total Files</td><td>${metrics.totalFiles}</td></tr>
      <tr><td>Total Lines</td><td>${metrics.totalLines}</td></tr>
      <tr><td>Average Lines per File</td><td>${metrics.avgLineLength.toFixed(2)}</td></tr>
      <tr><td>Code Lines</td><td>${metrics.codeLines}</td></tr>
      <tr><td>Comment Lines</td><td>${metrics.commentLines}</td></tr>
      <tr><td>Whitespace Lines</td><td>${metrics.whitespaceLines}</td></tr>
      <tr><td>Code/Comment Ratio</td><td>${metrics.codeCommentRatio.toFixed(2)}</td></tr>
      <tr><td>Code/Whitespace Ratio</td><td>${metrics.codeWhitespaceRatio.toFixed(2)}</td></tr>
      <tr><td>Code/Total Lines Ratio</td><td>${metrics.codeTotalLinesRatio.toFixed(2)}</td></tr>
      <tr><td>Code Lines per File</td><td>${metrics.codeLinesPerFile.toFixed(2)}</td></tr>
      <tr><td>Comment Lines per File</td><td>${metrics.commentLinesPerFile.toFixed(2)}</td></tr>
      <tr><td>Whitespace Lines per File</td><td>${metrics.whitespaceLinesPerFile.toFixed(2)}</td></tr>
    </tbody>
  </table>
</body>
</html>
  `;
  return htmlContent;
}

function main() {
  const files = glob.sync('./**/*.js', { ignore: ['node_modules/**', '.next/**'] });
  const results = files.map(file => ({
    file,
    ...analyzeFile(file),
  }));

  const metrics = calculateMetrics(results);

  const htmlContent = generateHTML(metrics);
  fs.writeFileSync(path.join(__dirname, 'metrics.html'), htmlContent, 'utf-8');
  console.log('Metrics report generated: metrics.html');
}

main();
