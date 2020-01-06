import React from 'react';

//results table component
function ResultsTable({ headings, rows }) {
  return (
    <table>
      <thead>
        <tr>
          {headings.map((heading, i) => {
            return <th key={i}>{heading}</th>;
          })}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default ResultsTable;
