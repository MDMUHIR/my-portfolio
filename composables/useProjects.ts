export const useProjects = () => {
  const projects = [
    {
      id: 1,
      title: "Project Alpha",
      category: "AI & Web Development",
      description:
        "An AI-powered search assistant that helps users find information instantly.",
      image: "🤖",
      details:
        "Built with Node.js backend, Vue.js frontend, machine learning models for recommendations, and a custom vector database for efficient semantic search.",
      fullDescription: `Project Alpha is a full-stack application featuring intelligent search capabilities powered by machine learning models. The platform demonstrates expertise in both frontend and backend development, with sophisticated AI integration.

Key Features:
- Real-time search with ML-powered recommendations
- RESTful API with 99.9% uptime SLA
- Responsive design supporting 100K+ concurrent users
- Advanced caching and optimization strategies
- Comprehensive API documentation

The project handles millions of queries daily with sub-100ms response times, showcasing mastery of performance optimization and scalability challenges.`,
      technologies: [
        "Vue.js",
        "Node.js",
        "PyTorch",
        "PostgreSQL",
        "Redis",
        "Docker",
        "AWS",
      ],
      stats: {
        users: "100K+",
        queries: "1M+ daily",
        uptime: "99.9%",
        avgResponse: "<100ms",
      },
      results: [
        "Reduced search latency by 70% through algorithm optimization",
        "Achieved 3.5x increase in user engagement",
        "Scaled from 1K to 100K users in 6 months",
      ],
      timeline: "6 months • 2023-2024",
      team: "5 developers, 1 ML specialist",
      links: {
        live: "#",
        github: "#",
        demo: "#",
      },
    },
    {
      id: 2,
      title: "Dashboard Pro",
      category: "Data Visualization & Analytics",
      description:
        "Real-time analytics dashboard built with WebSockets for live data updates.",
      image: "📊",
      details:
        "Enterprise-grade analytics platform providing real-time insights with interactive visualizations and predictive analytics powered by D3.js.",
      fullDescription: `Dashboard Pro is an enterprise-scale analytics platform designed to handle massive data streams with real-time visualization capabilities. It demonstrates expertise in scalable web architecture and advanced data visualization techniques.

Key Features:
- WebSocket-based real-time data streaming
- Advanced D3.js visualizations for complex data
- Handles millions of data points efficiently
- Custom dashboard builder for users
- Predictive analytics using machine learning
- Export to multiple formats (PDF, CSV, Excel)

The platform is used by Fortune 500 companies to monitor KPIs and make data-driven decisions in real-time.`,
      technologies: [
        "React",
        "Node.js",
        "WebSocket",
        "D3.js",
        "PostgreSQL",
        "Apache Kafka",
      ],
      stats: {
        datapoints: "10M+ per day",
        updateSpeed: "<100ms",
        users: "500+ companies",
        availability: "99.99%",
      },
      results: [
        "Decreased decision-making time by 80%",
        "Enabled monitoring of 10M+ data points in real-time",
        "Improved data accuracy to 99.98%",
      ],
      timeline: "8 months • 2023",
      team: "6 developers, 2 designers, 1 data engineer",
      links: {
        live: "#",
        github: "#",
        demo: "#",
      },
    },
    {
      id: 3,
      title: "CLI Tools Suite",
      category: "Developer Tools",
      description:
        "Developer tools and automation scripts to streamline workflows.",
      image: "⚙️",
      details:
        "A comprehensive collection of command-line tools designed to automate repetitive development tasks, improve productivity, and standardize workflows.",
      fullDescription: `CLI Tools Suite is a collection of 10+ command-line utilities designed to streamline common development tasks and improve workflow efficiency across teams.

Key Features:
- Project scaffolding tool supporting multiple frameworks
- Automated code formatting and linting
- Git workflow automation
- Database migration tools
- Performance profiling utilities
- Cross-platform compatibility (Windows, macOS, Linux)

Downloaded over 50K times on npm with an average rating of 4.7 stars, demonstrating strong community adoption and reliability.`,
      technologies: [
        "Node.js",
        "Commander.js",
        "Inquirer.js",
        "Jest",
        "npm",
        "ESLint",
      ],
      stats: {
        downloads: "50K+ monthly",
        stars: "1.2K on GitHub",
        coverage: "95% test coverage",
        users: "10K+ developers",
      },
      results: [
        "Reduced project setup time from hours to minutes",
        "Eliminated 40% of manual development tasks",
        "Improved code consistency across teams",
      ],
      timeline: "3 months • 2023",
      team: "2 developers, community contributors",
      links: {
        live: "#",
        github: "#",
        npm: "#",
      },
    },
  ];

  const getProjectById = (id: string | string[]) => {
    return projects.find((p) => String(p.id) === String(id));
  };

  const getRelatedProjects = (currentId: string | string[], limit = 2) => {
    return projects
      .filter((p) => String(p.id) !== String(currentId))
      .slice(0, limit);
  };

  return {
    projects,
    getProjectById,
    getRelatedProjects,
  };
};
