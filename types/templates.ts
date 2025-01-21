export type TemplateId = '1' | '2' | '3' | '4' | '5' | '6' | '7'

export interface Template {
  id: TemplateId
  name: string
  description: string
}

export const TEMPLATES: Template[] = [
  {
    id: '1',
    name: 'Startup',
    description: 'Template ideal para startups inovadoras e empresas de tecnologia.'
  },
  {
    id: '2',
    name: 'Consultoria Empresarial',
    description: 'Perfeito para consultores e empresas de consultoria.'
  },
  {
    id: '3',
    name: 'Advogado',
    description: 'Design profissional para advogados e escritórios de advocacia.'
  },
  {
    id: '4',
    name: 'Impressão Digital',
    description: 'Ideal para gráficas e serviços de impressão.'
  },
  {
    id: '5',
    name: 'Inovação Tecnológica',
    description: 'Template moderno para produtos e serviços tecnológicos.'
  },
  {
    id: '6',
    name: 'Dentista',
    description: 'Design especializado para consultórios odontológicos.'
  },
  {
    id: '7',
    name: 'Advocacia',
    description: 'Template moderno e profissional para escritórios de advocacia.'
  }
]

export interface ContentData {
  templateId: TemplateId
  title: string
  subtitle: string
  description: string
  ctaText: string
  images: {
    hero?: string
    logo?: string
    additional: string[]
  }
  testimonials?: {
    name: string
    text: string
    image?: string
  }[]
  features?: {
    title: string
    description: string
    icon?: string
  }[]
  aboutUs?: string
  socialLinks?: {
    icon: string
    url: string
  }[]
  footerText?: string
}

