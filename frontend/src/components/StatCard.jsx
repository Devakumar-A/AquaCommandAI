function StatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div
      className={`${color} text-white rounded-xl p-6 shadow-lg`}
    >
      <div className="text-4xl mb-3">
        {icon}
      </div>

      <h3 className="text-sm opacity-90">
        {title}
      </h3>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>
    </div>
  );
}

export default StatCard;