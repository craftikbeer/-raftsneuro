function Gallery() {
  const [scrollY, setScrollY] = React.useState(0);
  const [selectedProject, setSelectedProject] = React.useState(null);
  const [projects, setProjects] = React.useState([]);
  const [filteredProjects, setFilteredProjects] = React.useState([]);
  const [activeFilter, setActiveFilter] = React.useState('ВСЁ');
  const [searchTag, setSearchTag] = React.useState('');
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight || 1;
        const scrollProgress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / viewportHeight));
        setScrollY(scrollProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    loadProjectsFromFile();
  }, []);

  React.useEffect(() => {
    let filtered = projects;
    
    if (activeFilter !== 'ВСЁ') {
      filtered = filtered.filter(p => p.category === activeFilter);
    }
    
    if (searchTag.trim()) {
      filtered = filtered.filter(p => 
        p.tags && p.tags.some(tag => 
          tag.toLowerCase().includes(searchTag.toLowerCase())
        )
      );
    }
    
    setFilteredProjects(filtered);
  }, [activeFilter, searchTag, projects]);

  const loadProjectsFromFile = async () => {
    try {
      // Сначала проверяем LocalStorage
      const stored = localStorage.getItem('neurocrafts_projects');
      if (stored) {
        const data = JSON.parse(stored);
        setProjects(data.projects || []);
        setFilteredProjects(data.projects || []);
        return;
      }
      
      // Fallback проекты если нет в localStorage или файле
      const fallbackProjects = [
          {
            id: "1",
            title: "AI Портрет",
            category: "AI-Дизайн",
            image: "https://i.imgur.com/E040DG1.jpeg",
            description: "Создание реалистичного AI портрета с использованием нейросетей",
            comment: "Клиент хотел \"как у всех\". Мы сделали наоборот — и конверсия выросла на 180%.",
            tags: ["AI", "Портрет", "Нейросеть"]
          },
          {
            id: "2",
            title: "Редизайн Логотипа",
            category: "Нейроразработка",
            image: "https://i.imgur.com/UHhDTAb.jpeg",
            description: "Модернизация корпоративного логотипа с сохранением узнаваемости",
            comment: "Редизайн, который изменил восприятие бренда за 2 недели.",
            tags: ["Логотип", "Редизайн", "Брендинг"]
          },
          {
            id: "3",
            title: "Фирменный стиль",
            category: "Creative Tech",
            image: "https://i.imgur.com/Ia2nNxO.jpeg",
            description: "Разработка визуальной системы, которая говорит без слов.",
            comment: "Клиент инвестировал втрое больше изначального бюджета. Результат того стоил.",
            tags: ["Логотип", "Концепт", "Редизайн", "Брендинг", "Премиум", "Фирменный стиль"]
          }
        ];
      const fallbackData = { lastUpdated: new Date().toISOString(), projects: fallbackProjects };
      
      // Устанавливаем fallback сразу
      setProjects(fallbackProjects);
      setFilteredProjects(fallbackProjects);
      
      // Пробуем загрузить из файла
      try {
        const response = await fetch('data/projects.json');
        if (response.ok) {
          const data = await response.json();
          setProjects(data.projects || fallbackProjects);
          setFilteredProjects(data.projects || fallbackProjects);
          localStorage.setItem('neurocrafts_projects', JSON.stringify(data));
        } else {
          // Если fetch не удался, сохраняем fallback в localStorage
          localStorage.setItem('neurocrafts_projects', JSON.stringify(fallbackData));
        }
      } catch (fetchError) {
        console.log('Не удалось загрузить из файла, используем fallback данные');
        localStorage.setItem('neurocrafts_projects', JSON.stringify(fallbackData));
      }
    } catch (error) {
      console.error('Ошибка загрузки проектов:', error);
    }
  };

  const handleProjectClick = (project, index) => {
    setSelectedProject({ project, index });
  };

  const handleNavigate = (direction, targetIndex) => {
    if (!selectedProject) return;
    
    let newIndex;
    if (typeof targetIndex === 'number') {
      newIndex = targetIndex;
    } else {
      newIndex = direction === 'next' 
        ? (selectedProject.index + 1) % filteredProjects.length
        : (selectedProject.index - 1 + filteredProjects.length) % filteredProjects.length;
    }
    
    setSelectedProject({ 
      project: filteredProjects[newIndex], 
      index: newIndex 
    });
  };

  return (
    <>
    <section id="gallery" ref={sectionRef} className="min-h-screen py-20 md:py-32 px-4 md:px-8 lg:px-16" data-name="gallery" data-file="components/Gallery.js">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 md:mb-8 text-center tracking-tight uppercase leading-tight px-4">
          МОИ <span className="text-[var(--yellow)]">РАБОТЫ</span>
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl text-center mb-10 md:mb-16 font-bold text-gray-300 max-w-3xl mx-auto px-4">
          Реальные проекты с результатами
        </p>
        
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="ПОИСК ПО ТЕГАМ..."
              value={searchTag}
              onChange={(e) => setSearchTag(e.target.value)}
              className="w-full px-6 py-4 bg-black border-2 border-[var(--yellow)] focus:border-white focus:outline-none text-center font-bold uppercase tracking-wide placeholder-gray-500"
            />
            {searchTag && (
              <button
                onClick={() => setSearchTag('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[var(--yellow)] text-black hover:bg-white flex items-center justify-center transition-all"
              >
                <div className="icon-x text-sm font-black"></div>
              </button>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-16 md:mb-20">
          {['ВСЁ', 'AI-Дизайн', 'AI Креатив', 'Перенос логотипа', 'Упаковка продукта', 'Нейроразработка', 'Creative Tech'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 md:px-6 py-2 md:py-3 font-black text-xs md:text-sm uppercase tracking-wide transition-all transform hover:scale-105 border-2 ${
                activeFilter === filter
                  ? 'bg-[var(--yellow)] text-black border-black shadow-[0_0_30px_rgba(255,214,0,0.4)]'
                  : 'bg-black text-white border-[var(--yellow)] hover:bg-[var(--yellow)] hover:text-black'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="space-y-0">
          {filteredProjects.map((project, index) => (
            <div 
              key={index}
              onClick={() => handleProjectClick(project, index)}
              className="relative border-b-4 border-[var(--yellow)] cursor-pointer group hover:bg-white hover:bg-opacity-5 transition-all duration-300"
              style={{
                opacity: Math.max(0.5, Math.min(1, scrollY || 0)),
                transform: `translateY(${(1 - scrollY) * 30}px) translateX(${index % 2 === 0 ? (1 - scrollY) * 20 : (1 - scrollY) * -20}px)`
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="lg:col-span-2 p-6 md:p-8 flex items-center justify-center bg-black">
                  <span className="text-5xl md:text-6xl lg:text-8xl font-black text-white text-opacity-10">0{index + 1}</span>
                </div>
                
                <div className="lg:col-span-4 relative overflow-hidden" style={{ height: '350px', minHeight: '350px' }}>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-6 left-6 px-4 py-2 bg-[var(--yellow)] text-black text-xs font-black uppercase transform -skew-x-6">
                    {project.category}
                  </div>
                </div>

                <div className="lg:col-span-6 p-6 md:p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-r from-black to-transparent">
                  <h3 className="text-2xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6 uppercase tracking-tight leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-base md:text-lg lg:text-xl text-[var(--yellow)] font-black mb-4 md:mb-6 leading-relaxed">
                    "{project.comment}"
                  </p>
                  <p className="text-sm md:text-base text-gray-400 mb-6 md:mb-8 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-black uppercase text-white group-hover:text-[var(--yellow)] transition-colors">
                      СМОТРЕТЬ ПРОЕКТ
                    </span>
                    <div className="icon-arrow-right text-lg group-hover:translate-x-2 transition-transform"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    {selectedProject && (
      <ProjectModal 
        project={selectedProject.project}
        currentIndex={selectedProject.index}
        totalProjects={filteredProjects.length}
        allProjects={filteredProjects}
        onNavigate={handleNavigate}
        onClose={() => setSelectedProject(null)} 
      />
    )}
    </>
  );
}