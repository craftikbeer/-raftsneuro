function ParallaxElements() {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--yellow)] rounded-full blur-3xl opacity-10"
        style={{
          transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30 + scrollY * 0.3}px)`
        }}
      />
      <div
        className="absolute top-1/2 right-1/4 w-48 h-48 bg-white rounded-full blur-3xl opacity-5"
        style={{
          transform: `translate(${mousePos.x * -40}px, ${mousePos.y * -40 + scrollY * 0.5}px)`
        }}
      />
      <div
        className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-[var(--yellow)] rounded-full blur-3xl opacity-10"
        style={{
          transform: `translate(${mousePos.x * 50}px, ${mousePos.y * 50 - scrollY * 0.2}px)`
        }}
      />
    </div>
  );
}