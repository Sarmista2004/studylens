function Header() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl font-bold tracking-tight text-white">Focus Mode</h1>
      <div className="flex items-center gap-3 mt-2">
        <span className="w-8 h-px bg-gray-600" />
        <p className="text-gray-400">One session at a time.</p>
        <span className="w-8 h-px bg-gray-600" />
      </div>
    </div>
  );
}

export default Header;