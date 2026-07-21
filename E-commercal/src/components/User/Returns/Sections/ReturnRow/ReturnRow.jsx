import "./ReturnRow.css";

const ReturnRow = ({ item }) => {
  return (
    <div className="return-row">
      <div className="return-product">
        <img src={item.image} alt={item.name} />

        <div>
          <h4>{item.name}</h4>
          <p>Qty : {item.qty}</p>
          <span>Total : ${Number(item.total).toFixed(2)}</span>
        </div>
      </div>

      <span className="id-badge">#{item.returnId}</span>

      <span className="id-badge">#{item.orderId}</span>

      <span>{item.displayDate}</span>

      <span className={`status ${item.status.toLowerCase()}`}>
        {item.status}
      </span>
    </div>
  );
};

export default ReturnRow;
