// filepath: /home/amctrld/WebstormProjects/Frank/Vaccine Tracker/Vaxin8/vaccine-tracker/eslint-plugins/eslint-plugin-metrics.js
const fs = require('fs');
const path = require('path');

module.exports = {
  rules: {
    'collect-metrics': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Collect code metrics',
          category: 'Best Practices',
          recommended: false,
        },
        schema: [],
      },
      create(context) {
        const metrics = {
          totalFiles: 0,
          totalLines: 0,
          totalLineLength: 0,
          codeLines: 0,
          commentLines: 0,
          whitespaceLines: 0,
        };

        return {
          Program(node) {
            const filePath = context.getFilename();
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const lines = fileContent.split('\n');

            metrics.totalFiles += 1;
            metrics.totalLines += lines.length;

            lines.forEach(line => {
              metrics.totalLineLength += line.length;
              if (line.trim().startsWith('//') || line.trim().startsWith('/*')) {
                metrics.commentLines += 1;
              } else if (line.trim() === '') {
                metrics.whitespaceLines += 1;
              } else {
                metrics.codeLines += 1;
              }
            });
          },
          'Program:exit'() {
            const avgLineLength = metrics.totalLineLength / metrics.totalLines;
            const codeCommentWhitespaceRatio = metrics.codeLines / (metrics.commentLines + metrics.whitespaceLines);
            const codeCommentRatio = metrics.codeLines / metrics.commentLines;
            const codeWhitespaceRatio = metrics.codeLines / metrics.whitespaceLines;
            const codeTotalLinesRatio = metrics.codeLines / metrics.totalLines;
            const codeLinesPerFile = metrics.codeLines / metrics.totalFiles;
            const commentLinesPerFile = metrics.commentLines / metrics.totalFiles;
            const whitespaceLinesPerFile = metrics.whitespaceLines / metrics.totalFiles;

            const reportContent = `
              <html>
              <head><title>ESLint Metrics Report</title></head>
              <body>
                <h1>Metrics Report</h1>
                <ul>
                  <li>Total Files: ${metrics.totalFiles}</li>
                  <li>Total Lines: ${metrics.totalLines}</li>
                  <li>Avg Line Length: ${avgLineLength.toFixed(2)}</li>
                  <li>Code Lines: ${metrics.codeLines}</li>
                  <li>Comment Lines: ${metrics.commentLines}</li>
                  <li>Whitespace Lines: ${metrics.whitespaceLines}</li>
                  <li>Code/(Comment+Whitespace) Ratio: ${codeCommentWhitespaceRatio.toFixed(2)}</li>
                  <li>Code/Comment Ratio: ${codeCommentRatio.toFixed(2)}</li>
                  <li>Code/Whitespace Ratio: ${codeWhitespaceRatio.toFixed(2)}</li>
                  <li>Code/Total Lines Ratio: ${codeTotalLinesRatio.toFixed(2)}</li>
                  <li>Code Lines per File: ${codeLinesPerFile.toFixed(2)}</li>
                  <li>Comment Lines per File: ${commentLinesPerFile.toFixed(2)}</li>
                  <li>Whitespace Lines per File: ${whitespaceLinesPerFile.toFixed(2)}</li>
                </ul>
              </body>
              </html>
            `;

            fs.writeFileSync(path.join(__dirname, '../eslint-metrics-report.html'), reportContent);
          },
        };
      },
    },
  },
};