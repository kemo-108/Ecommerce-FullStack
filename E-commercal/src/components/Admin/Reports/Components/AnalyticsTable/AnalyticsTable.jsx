import "./AnalyticsTable.css";

const AnalyticsTable = ({ title, columns, data, renderRow }) => {
  return (
    <div className="analytics-table">
      <div className="analytics-table-header">
        <h3>{title}</h3>

        <button>View All</button>
      </div>

      <div className="analytics-table-wrapper">
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>

          <tbody>{data.map((item) => renderRow(item))}</tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalyticsTable;
