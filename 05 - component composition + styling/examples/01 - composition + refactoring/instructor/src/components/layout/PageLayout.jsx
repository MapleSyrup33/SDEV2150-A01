export default function PageLayout({ header, children }) {
  // I'm just adding a grey background to the overall layout (bg-gray-100)
  // and a bottom border on the header (border-b) so you can explicitly see
  // how this component controls layout. Take out those classes in the code below
  // to just get the normal UI!
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b bg-white px-6 py-4">
        {header}
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 py-6 md:grid-cols-3">
        {children}
      </main>
    </div>
  );
}


// implementation from Readme:
/*

export default function PageLayout({ header, left, middle, right }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b bg-white px-6 py-4">
        {header}
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 py-6 md:grid-cols-3">
        <aside>{left}</aside>
        <section className="md:col-span-2">{middle}</section>
        <aside>{right}</aside>
      </main>
    </div>
  );
}

*/