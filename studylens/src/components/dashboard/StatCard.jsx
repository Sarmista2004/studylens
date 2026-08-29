function StatCard({ icon, title, value, link }) {
  return (
    <div className="bg-gray-50 dark:bg-slate-900 rounded-xl p-4 transition-colors">
      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
        {icon}
        <p className="text-sm">{title}</p>
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        {value}
      </h2>

      {link && (
        <a
          href={link.to}
          className="text-xs text-purple-600 dark:text-purple-400 mt-1 inline-block"
        >
          {link.label} →
        </a>
      )}
    </div>
  );
}

export default StatCard;
