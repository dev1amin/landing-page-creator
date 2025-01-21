export type BlockType =
  | "hero"
  | "features"
  | "testimonials"
  | "video"
  | "about"
  | "services"
  | "cta"
  | "pricing"
  | "whatsapp"
  | "instagram"
  | "facebook"
  | "custom"
  | "footer" // Add this line

export interface HeroContent {
  title: string
  subtitle: string
  description?: string
  ctaText: string
  image?: string
  alignment?: "left" | "right" | "center"
}

export interface FeaturesContent {
  title: string
  subtitle?: string
  features: Array<{
    id: string
    title: string
    description: string
    icon?: string
    image?: string
  }>
}

export interface TestimonialsContent {
  title: string
  subtitle?: string
  testimonials: Array<{
    id: string
    name: string
    role?: string
    text: string
    image?: string
    rating?: number
  }>
}

export interface VideoContent {
  title: string
  subtitle?: string
  videoUrl: string
  thumbnailUrl?: string
  description?: string
}

export interface AboutContent {
  title: string
  subtitle?: string
  description: string
  image?: string
  stats?: Array<{
    id: string
    label: string
    value: string
  }>
}

export interface ServicesContent {
  title: string
  subtitle?: string
  services: Array<{
    id: string
    title: string
    description: string
    icon?: string
    image?: string
    price?: string
  }>
}

export interface CTAContent {
  title: string
  subtitle?: string
  description?: string
  buttonText: string
  buttonUrl?: string
  image?: string
}

export interface PricingContent {
  title: string
  subtitle?: string
  description?: string
  plans: Array<{
    id: string
    name: string
    price: string
    description?: string
    features: string[]
    buttonText: string
    isHighlighted?: boolean
  }>
}

export interface ContactContent {
  title: string
  subtitle?: string
  description?: string
  email?: string
  phone?: string
  address?: string
  formFields: Array<{
    id: string
    type: "text" | "email" | "textarea"
    label: string
    required?: boolean
  }>
  submitButtonText: string
}

export interface CustomContent {
  html: string
}

export interface WhatsAppContent {
  phoneNumber: string
  message?: string
}

export interface InstagramContent {
  username: string
}

export interface FacebookContent {
  pageUrl: string
}

export interface FooterContent {
  logo?: string
  description?: string
  navigation: Array<{
    title: string
    links: Array<{
      label: string
      url: string
    }>
  }>
  socialLinks?: Array<{
    platform: string
    url: string
    icon: string
  }>
  bottomText?: string
  copyright?: string
}

export type BlockContent =
  | HeroContent
  | FeaturesContent
  | TestimonialsContent
  | VideoContent
  | AboutContent
  | ServicesContent
  | CTAContent
  | PricingContent
  | WhatsAppContent
  | InstagramContent
  | FacebookContent
  | CustomContent
  | FooterContent

export interface Block {
  id: string
  type: BlockType
  content: BlockContent
  styles?: {
    backgroundColor?: string
    textColor?: string
    padding?: string
    margin?: string
    buttonBg?: string // Add this line
    buttonText?: string // Add this line
    [key: string]: string | undefined
  }
}

export interface GlobalStyles {
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
  textColor: string
  testimonialsBg: string
  footerBg: string
  headingColor: string
  linkColor: string
  // Add font customization options
  headingFont: string
  bodyFont: string
}

export interface ContentData {
  templateId: string
  title: string
  subtitle: string
  description: string
  ctaText: string
  blocks: Block[]
  styles: GlobalStyles
  images: {
    hero?: string
    logo?: string
    additional: string[]
  }
}

export const DEFAULT_STYLES: GlobalStyles = {
  primaryColor: "#3B82F6",
  secondaryColor: "#1F2937",
  backgroundColor: "#FFFFFF",
  textColor: "#1F2937",
  testimonialsBg: "#F3F4F6",
  footerBg: "#111827",
  headingColor: "#111827",
  linkColor: "#2563EB",
  headingFont: "inter",
  bodyFont: "inter",
}

export const DEFAULT_BLOCKS: Block[] = [
  {
    id: "hero-1",
    type: "hero",
    content: {
      title: "Bem-vindo ao seu novo site",
      subtitle: "Personalize este conteúdo no painel administrativo",
      ctaText: "Comece Agora",
    },
    styles: {
      backgroundColor: "#F9FAFB",
      textColor: "#111827",
      padding: "4rem 0",
    },
  },
  {
    id: "features-1",
    type: "features",
    content: {
      title: "Nossos Recursos",
      features: [
        {
          id: "1",
          title: "Recurso 1",
          description: "Descrição do recurso 1",
          icon: "feature-icon",
        },
        {
          id: "2",
          title: "Recurso 2",
          description: "Descrição do recurso 2",
          icon: "feature-icon",
        },
      ],
    },
    styles: {
      backgroundColor: "#FFFFFF",
      textColor: "#111827",
      padding: "4rem 0",
    },
  },
]

export const DEFAULT_CONTENT: ContentData = {
  templateId: "1",
  title: "Bem-vindo ao seu novo site",
  subtitle: "Personalize este conteúdo no painel administrativo",
  description: "Este é um texto de exemplo. Acesse /admin para editar o conteúdo.",
  ctaText: "Comece Agora",
  blocks: DEFAULT_BLOCKS,
  styles: DEFAULT_STYLES,
  images: {
    hero: "/placeholder.svg?height=400&width=600",
    logo: "/placeholder.svg?height=60&width=200",
    additional: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
  },
}

export interface TemplateDefaults {
  styles: GlobalStyles
  blocks: Block[]
  content: {
    title: string
    subtitle: string
    description: string
    ctaText: string
  }
}

export const TEMPLATE_DEFAULTS: Record<string, TemplateDefaults> = {
  "1": {
    styles: {
      primaryColor: "#4F46E5",
      secondaryColor: "#4338CA",
      backgroundColor: "#FFFFFF",
      textColor: "#111827",
      testimonialsBg: "#F9FAFB",
      footerBg: "#1F2937",
      headingColor: "#111827",
      linkColor: "#4F46E5",
      headingFont: "montserrat",
      bodyFont: "inter",
    },
    blocks: [
      {
        id: "hero-1",
        type: "hero",
        content: {
          title: "Acelere sua Startup com a Melhor Landing Page!",
          subtitle: "Tudo o que você precisa para crescer online: rápido, fácil e sem complicações.",
          ctaText: "Experimente Grátis",
          description: "Crie landing pages profissionais em minutos",
        },
        styles: {
          backgroundColor: "transparent",
          textColor: "#FFFFFF",
          padding: "4rem 0",
        },
      },
      {
        id: "features-1",
        type: "features",
        content: {
          title: "Por que somos a escolha certa?",
          features: [
            {
              id: "1",
              title: "Criação rápida e intuitiva",
              description: "Monte sua landing page em minutos com nossa interface amigável.",
              icon: "rocket",
            },
            {
              id: "2",
              title: "Layouts profissionais",
              description: "Templates modernos e otimizados para conversão.",
              icon: "palette",
            },
            {
              id: "3",
              title: "Otimizado para SEO",
              description: "Apareça nos resultados de busca e atraia mais visitantes.",
              icon: "search",
            },
            {
              id: "4",
              title: "Integração com marketing",
              description: "Conecte suas ferramentas favoritas facilmente.",
              icon: "refresh-cw",
            },
            {
              id: "5",
              title: "100% responsivo",
              description: "Sua página perfeita em qualquer dispositivo.",
              icon: "smartphone",
            },
            {
              id: "6",
              title: "Suporte especializado",
              description: "Conte com nossa equipe para tirar suas dúvidas.",
              icon: "message-circle",
            },
          ],
        },
        styles: {
          backgroundColor: "#FFFFFF",
          textColor: "#111827",
          padding: "4rem 0",
        },
      },
      {
        id: "about-1",
        type: "about",
        content: {
          title: "Transforme seu Potencial em Resultados",
          description:
            "No mundo competitivo de startups, tempo é essencial. Por isso, criamos uma ferramenta que elimina as barreiras entre sua ideia e o mercado.",
          stats: [
            {
              id: "1",
              label: "Startups atendidas",
              value: "500+",
            },
            {
              id: "2",
              label: "Satisfação dos clientes",
              value: "90%",
            },
          ],
        },
        styles: {
          backgroundColor: "#F9FAFB",
          textColor: "#111827",
          padding: "4rem 0",
        },
      },
      {
        id: "services-1",
        type: "services",
        content: {
          title: "Nossas Soluções para Startups",
          services: [
            {
              id: "1",
              title: "Landing Pages",
              description: "Criação de páginas otimizadas para conversão.",
              icon: "layout",
            },
            {
              id: "2",
              title: "SEO Básico",
              description: "Apareça no topo das buscas e atraia mais leads.",
              icon: "trending-up",
            },
            {
              id: "3",
              title: "Suporte 24/7",
              description: "Nossa equipe está pronta para ajudar a qualquer momento.",
              icon: "headphones",
            },
            {
              id: "4",
              title: "Planos Flexíveis",
              description: "Escolha o que melhor atende suas necessidades.",
              icon: "package",
            },
          ],
        },
        styles: {
          backgroundColor: "#FFFFFF",
          textColor: "#111827",
          padding: "4rem 0",
        },
      },
      {
        id: "testimonials-1",
        type: "testimonials",
        content: {
          title: "O que Nossos Clientes Dizem",
          testimonials: [
            {
              id: "1",
              name: "João Silva",
              role: "CEO da TechStart",
              text: "Nossa startup ganhou tração muito mais rápido com o Landing Creator Pro!",
              image: "/placeholder.svg",
            },
            {
              id: "2",
              name: "Maria Ferreira",
              role: "Fundadora da HealthTrack",
              text: "Não precisávamos de desenvolvedor e economizamos muito tempo.",
              image: "/placeholder.svg",
            },
            {
              id: "3",
              name: "Pedro Santos",
              role: "CMO da InnovateTech",
              text: "A melhor decisão que tomamos para nosso marketing digital!",
              image: "/placeholder.svg",
            },
          ],
        },
        styles: {
          backgroundColor: "#F9FAFB",
          textColor: "#111827",
          padding: "4rem 0",
        },
      },
      {
        id: "video-1",
        type: "video",
        content: {
          title: "Veja Como Funciona",
          subtitle: "Assista ao vídeo e descubra como criar sua landing page em minutos.",
          videoUrl: "",
          description: "Um guia completo sobre como utilizar nossa plataforma.",
        },
        styles: {
          backgroundColor: "#FFFFFF",
          textColor: "#111827",
          padding: "4rem 0",
        },
      },
      {
        id: "pricing-1",
        type: "pricing",
        content: {
          title: "Escolha o Plano Ideal para Sua Startup",
          plans: [
            {
              id: "1",
              name: "Básico",
              price: "R$ 49",
              description: "Para quem está começando",
              features: ["3 blocos personalizáveis", "Edição básica", "Suporte via e-mail", "Domínio personalizado"],
              buttonText: "Começar Agora",
              isHighlighted: false,
            },
            {
              id: "2",
              name: "Avançado",
              price: "R$ 99",
              description: "Para startups em crescimento",
              features: [
                "6 blocos personalizáveis",
                "Suporte em tempo real",
                "Personalização avançada",
                "Integrações de marketing",
                "Análise de conversão",
              ],
              buttonText: "Começar Agora",
              isHighlighted: true,
            },
            {
              id: "3",
              name: "Pro",
              price: "R$ 199",
              description: "Controle total para startups escaláveis",
              features: [
                "Blocos ilimitados",
                "Suporte dedicado",
                "Layout exclusivo",
                "Integrações premium",
                "Exportação de dados",
                "Multi-idiomas",
              ],
              buttonText: "Começar Agora",
              isHighlighted: false,
            },
          ],
        },
        styles: {
          backgroundColor: "#F9FAFB",
          textColor: "#111827",
          padding: "4rem 0",
        },
      },
      {
        id: "cta-1",
        type: "cta",
        content: {
          title: "Pronto para Impulsionar sua Startup?",
          description: "Clique abaixo e crie sua página agora mesmo!",
          buttonText: "Quero Começar!",
          buttonUrl: "#",
        },
        styles: {
          backgroundColor: "transparent",
          textColor: "#FFFFFF",
          padding: "4rem 0",
        },
      },
      {
        id: "whatsapp-1",
        type: "whatsapp",
        content: {
          phoneNumber: "",
          message: "Olá! Gostaria de saber mais sobre o Landing Creator Pro!",
        },
        styles: {
          backgroundColor: "transparent",
          textColor: "#FFFFFF",
          padding: "0",
        },
      },
    ],
    content: {
      title: "Acelere sua Startup com a Melhor Landing Page!",
      subtitle: "Tudo o que você precisa para crescer online: rápido, fácil e sem complicações.",
      description: "Crie landing pages profissionais em minutos com o Landing Creator Pro.",
      ctaText: "Experimente Grátis",
    },
  },
  "2": {
    styles: {
      primaryColor: "#0284C7",
      secondaryColor: "#0369A1",
      backgroundColor: "#FFFFFF",
      textColor: "#0F172A",
      testimonialsBg: "#F1F5F9",
      footerBg: "#0F172A",
      headingColor: "#0F172A",
      linkColor: "#0284C7",
      headingFont: "inter",
      bodyFont: "inter",
    },
    blocks: [
      {
        id: "hero-2",
        type: "hero",
        content: {
          title: "Consultoria Empresarial Especializada",
          subtitle: "Soluções estratégicas para seu negócio crescer",
          ctaText: "Agende uma Consulta",
        },
        styles: {
          backgroundColor: "#F1F5F9",
          textColor: "#0F172A",
          padding: "4rem 0",
        },
      },
      {
        id: "services-2",
        type: "services",
        content: {
          title: "Nossos Serviços",
          services: [
            {
              id: "1",
              title: "Gestão Estratégica",
              description: "Planejamento e execução de estratégias",
              icon: "strategy",
            },
            {
              id: "2",
              title: "Otimização de Processos",
              description: "Melhoria contínua e eficiência",
              icon: "process",
            },
          ],
        },
        styles: {
          backgroundColor: "#FFFFFF",
          textColor: "#0F172A",
          padding: "4rem 0",
        },
      },
    ],
    content: {
      title: "Consultoria Empresarial Especializada",
      subtitle: "Soluções estratégicas para seu negócio crescer",
      description: "Expertise em gestão e desenvolvimento empresarial",
      ctaText: "Agende uma Consulta",
    },
  },
  "3": {
    styles: {
      primaryColor: "#A361FF",
      secondaryColor: "#8A4AFF",
      backgroundColor: "#FFFFFF",
      textColor: "#111827",
      testimonialsBg: "#F9FAFB",
      footerBg: "#1F2937",
      headingColor: "#111827",
      linkColor: "#A361FF",
      headingFont: "inter",
      bodyFont: "inter",
    },
    blocks: [
      {
        id: "hero-3",
        type: "hero",
        content: {
          title: "Serviços Jurídicos Especializados",
          subtitle: "Soluções legais para sua empresa",
          ctaText: "Agende uma Consulta",
        },
        styles: {
          backgroundColor: "#F9FAFB",
          textColor: "#111827",
          padding: "4rem 0",
        },
      },
    ],
    content: {
      title: "Serviços Jurídicos Especializados",
      subtitle: "Soluções legais para sua empresa",
      description: "Assessoria jurídica completa para seu negócio",
      ctaText: "Agende uma Consulta",
    },
  },
  "4": {
    styles: {
      primaryColor: "#FF6A5A",
      secondaryColor: "#FF4D4D",
      backgroundColor: "#FFFFFF",
      textColor: "#111827",
      testimonialsBg: "#F9FAFB",
      footerBg: "#1F2937",
      headingColor: "#111827",
      linkColor: "#FF6A5A",
      headingFont: "inter",
      bodyFont: "inter",
    },
    blocks: [
      {
        id: "hero-4",
        type: "hero",
        content: {
          title: "Impressão Digital Profissional",
          subtitle: "Qualidade e rapidez em cada impressão",
          ctaText: "Solicitar Orçamento",
        },
        styles: {
          backgroundColor: "#F9FAFB",
          textColor: "#111827",
          padding: "4rem 0",
        },
      },
    ],
    content: {
      title: "Impressão Digital Profissional",
      subtitle: "Qualidade e rapidez em cada impressão",
      description: "Soluções completas em impressão digital",
      ctaText: "Solicitar Orçamento",
    },
  },
  "5": {
    styles: {
      primaryColor: "#22C55E",
      secondaryColor: "#16A34A",
      backgroundColor: "#FFFFFF",
      textColor: "#111827",
      testimonialsBg: "#F9FAFB",
      footerBg: "#1F2937",
      headingColor: "#111827",
      linkColor: "#22C55E",
      headingFont: "inter",
      bodyFont: "inter",
    },
    blocks: [
      {
        id: "hero-5",
        type: "hero",
        content: {
          title: "Tecnologia do Futuro",
          subtitle: "Inovação que transforma",
          ctaText: "Saiba Mais",
        },
        styles: {
          backgroundColor: "#F9FAFB",
          textColor: "#111827",
          padding: "4rem 0",
        },
      },
    ],
    content: {
      title: "Tecnologia do Futuro",
      subtitle: "Inovação que transforma",
      description: "Soluções tecnológicas para o amanhã",
      ctaText: "Saiba Mais",
    },
  },
  "6": {
    styles: {
      primaryColor: "#14B8A6",
      secondaryColor: "#0D9488",
      backgroundColor: "#FFFFFF",
      textColor: "#111827",
      testimonialsBg: "#F9FAFB",
      footerBg: "#1F2937",
      headingColor: "#111827",
      linkColor: "#14B8A6",
      headingFont: "inter",
      bodyFont: "inter",
    },
    blocks: [
      {
        id: "hero-6",
        type: "hero",
        content: {
          title: "Sorria com Confiança",
          subtitle: "Cuidados odontológicos personalizados",
          ctaText: "Agende sua Consulta",
        },
        styles: {
          backgroundColor: "#F9FAFB",
          textColor: "#111827",
          padding: "4rem 0",
        },
      },
    ],
    content: {
      title: "Sorria com Confiança",
      subtitle: "Cuidados odontológicos personalizados",
      description: "Tratamentos modernos com profissionais especializados",
      ctaText: "Agende sua Consulta",
    },
  },
  "7": {
    styles: {
      primaryColor: "#1E3A8A", // Dark blue
      secondaryColor: "#1E40AF", // Slightly lighter blue
      backgroundColor: "#FFFFFF",
      textColor: "#1F2937",
      testimonialsBg: "#F8FAFC",
      footerBg: "#0F172A",
      headingColor: "#1E3A8A",
      linkColor: "#1E3A8A",
      headingFont: "montserrat",
      bodyFont: "inter",
    },
    blocks: [
      {
        id: "hero-law",
        type: "hero",
        content: {
          title: "Protegendo o presente, planejando o futuro.",
          subtitle: "Consultoria e assessoria jurídica especializada em direito empresarial e contratos.",
          ctaText: "Solicite sua Consultoria",
          description: "Soluções jurídicas personalizadas para sua empresa",
        },
        styles: {
          backgroundColor: "transparent",
          textColor: "#FFFFFF",
          padding: "4rem 0",
        },
      },
      {
        id: "about-law",
        type: "about",
        content: {
          title: "Conheça a Advocacia Costa & Silva",
          description:
            "Somos um escritório de advocacia com mais de 10 anos de experiência, oferecendo soluções jurídicas personalizadas para empresas que buscam segurança e inovação. Nosso diferencial está no atendimento próximo e na análise detalhada de cada caso para garantir o melhor resultado.",
          image: "/placeholder.svg?height=400&width=600",
        },
        styles: {
          backgroundColor: "#F8FAFC",
          textColor: "#1F2937",
          padding: "4rem 0",
        },
      },
      {
        id: "services-law",
        type: "services",
        content: {
          title: "Nossos Serviços",
          services: [
            {
              id: "1",
              title: "Consultoria Jurídica Empresarial",
              description: "Assessoria completa para empresas, desde a constituição até operações complexas.",
              icon: "briefcase",
            },
            {
              id: "2",
              title: "Análise de Contratos",
              description: "Revisão e elaboração de contratos comerciais e societários.",
              icon: "file-text",
            },
            {
              id: "3",
              title: "Defesa Judicial",
              description: "Representação em processos judiciais e administrativos.",
              icon: "scale",
            },
            {
              id: "4",
              title: "Suporte Jurídico Mensal",
              description: "Acompanhamento contínuo para sua empresa.",
              icon: "shield",
            },
          ],
        },
        styles: {
          backgroundColor: "#FFFFFF",
          textColor: "#1F2937",
          padding: "4rem 0",
        },
      },
      {
        id: "testimonials-law",
        type: "testimonials",
        content: {
          title: "O que nossos clientes dizem",
          testimonials: [
            {
              id: "1",
              name: "Carlos Almeida",
              role: "Empresário",
              text: "O atendimento da Advocacia Costa & Silva foi fundamental para a segurança da minha empresa.",
              image: "/placeholder.svg",
            },
            {
              id: "2",
              name: "Juliana Santos",
              role: "Empreendedora",
              text: "Profissionais atenciosos que realmente se importam com o sucesso do cliente.",
              image: "/placeholder.svg",
            },
          ],
        },
        styles: {
          backgroundColor: "#F8FAFC",
          textColor: "#1F2937",
          padding: "4rem 0",
        },
      },
      {
        id: "features-law",
        type: "features",
        content: {
          title: "Tire Suas Dúvidas",
          features: [
            {
              id: "1",
              title: "Como funciona o processo de consultoria jurídica?",
              description:
                "Agendamos uma reunião inicial para entender suas necessidades e apresentar as melhores soluções.",
              icon: "help-circle",
            },
            {
              id: "2",
              title: "Quanto custa contratar um advogado para empresas?",
              description: "Oferecemos planos personalizados de acordo com as necessidades da sua empresa.",
              icon: "dollar-sign",
            },
            {
              id: "3",
              title: "Quais serviços estão incluídos no suporte jurídico mensal?",
              description: "Consultoria contínua, análise de contratos e acompanhamento de processos.",
              icon: "check-circle",
            },
          ],
        },
        styles: {
          backgroundColor: "#FFFFFF",
          textColor: "#1F2937",
          padding: "4rem 0",
        },
      },
      {
        id: "cta-law",
        type: "cta",
        content: {
          title: "Aproveite Nossa Primeira Consultoria Gratuita",
          description: "Oferecemos uma primeira consulta gratuita para empresas de pequeno porte.",
          buttonText: "Agende sua Consulta",
          buttonUrl: "#",
        },
        styles: {
          backgroundColor: "#1E3A8A",
          textColor: "#FFFFFF",
          padding: "4rem 0",
        },
      },
      {
        id: "whatsapp-law",
        type: "whatsapp",
        content: {
          phoneNumber: "",
          message: "Olá, gostaria de saber mais sobre seus serviços jurídicos!",
        },
        styles: {
          backgroundColor: "transparent",
          textColor: "#FFFFFF",
          padding: "0",
        },
      },
    ],
    content: {
      title: "Protegendo o presente, planejando o futuro.",
      subtitle: "Consultoria e assessoria jurídica especializada em direito empresarial e contratos.",
      description: "Soluções jurídicas personalizadas para sua empresa",
      ctaText: "Solicite sua Consultoria",
    },
  },
}

