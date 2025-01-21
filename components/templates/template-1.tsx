import { ContentData } from '@/types/templates'
import Image from 'next/image'
import { Play, Star } from 'lucide-react'

interface Template1Props {
  content: ContentData
}

export default function Template1({ content }: Template1Props) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat leading-tight">
                {content.title || 'Acelere sua Startup com a Melhor Landing Page!'}
              </h1>
              <p className="text-xl text-gray-100">
                {content.subtitle || 'Tudo o que você precisa para crescer online: rápido, fácil e sem complicações.'}
              </p>
              <button className="inline-flex items-center px-8 py-3 text-lg font-semibold rounded-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transition-all transform hover:scale-105">
                Experimente Grátis
              </button>
            </div>
            <div className="relative h-[400px] lg:h-[500px]">
              {content.images.hero && (
                <Image
                  src={content.images.hero}
                  alt="Hero"
                  fill
                  className="object-contain"
                  priority
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Por que somos a escolha certa?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Criação rápida e intuitiva',
                description: 'Monte sua landing page em minutos com nossa interface amigável.',
                icon: '⚡'
              },
              {
                title: 'Layouts profissionais',
                description: 'Templates modernos e otimizados para conversão.',
                icon: '🎨'
              },
              {
                title: 'Otimizado para SEO',
                description: 'Apareça nos resultados de busca e atraia mais visitantes.',
                icon: '🎯'
              },
              {
                title: 'Integração com marketing',
                description: 'Conecte suas ferramentas favoritas facilmente.',
                icon: '🔄'
              },
              {
                title: '100% responsivo',
                description: 'Sua página perfeita em qualquer dispositivo.',
                icon: '📱'
              },
              {
                title: 'Suporte especializado',
                description: 'Conte com nossa equipe para tirar suas dúvidas.',
                icon: '💬'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px]">
              {content.images.about && (
                <Image
                  src={content.images.about}
                  alt="About Us"
                  fill
                  className="object-cover rounded-lg"
                />
              )}
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Transforme seu Potencial em Resultados
              </h2>
              <p className="text-xl text-gray-600">
                No mundo competitivo de startups, tempo é essencial. Por isso, criamos uma ferramenta
                que elimina as barreiras entre sua ideia e o mercado.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-blue-600">500+</div>
                  <div className="text-gray-600">Startups atendidas</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-blue-600">90%</div>
                  <div className="text-gray-600">Satisfação dos clientes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Nossas Soluções para Startups
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Landing Pages',
                description: 'Criação de páginas otimizadas para conversão.',
                icon: '🚀'
              },
              {
                title: 'SEO Básico',
                description: 'Apareça no topo das buscas e atraia mais leads.',
                icon: '📈'
              },
              {
                title: 'Suporte 24/7',
                description: 'Nossa equipe está pronta para ajudar a qualquer momento.',
                icon: '🎯'
              },
              {
                title: 'Planos Flexíveis',
                description: 'Escolha o que melhor atende suas necessidades.',
                icon: '💎'
              }
            ].map((service, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            O que Nossos Clientes Dizem
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                text: "Nossa startup ganhou tração muito mais rápido com o Landing Creator Pro!",
                name: "João Silva",
                role: "CEO da TechStart",
                rating: 5
              },
              {
                text: "Não precisávamos de desenvolvedor e economizamos muito tempo.",
                name: "Maria Ferreira",
                role: "Fundadora da HealthTrack",
                rating: 5
              },
              {
                text: "A melhor decisão que tomamos para nosso marketing digital!",
                name: "Pedro Santos",
                role: "CMO da InnovateTech",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{testimonial.text}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                    <Image
                      src="/placeholder.svg"
                      alt={testimonial.name}
                      width={48}
                      height={48}
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Veja Como Funciona
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            Assista ao vídeo e descubra como criar sua landing page em minutos.
          </p>
          <div className="relative max-w-4xl mx-auto aspect-video bg-gray-900 rounded-xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-110">
                <Play className="w-8 h-8 text-blue-600 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Escolha o Plano Ideal para Sua Startup
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Básico",
                description: "Para quem está começando",
                price: "R$ 49",
                features: [
                  "3 blocos personalizáveis",
                  "Edição básica",
                  "Suporte via e-mail",
                  "Domínio personalizado"
                ]
              },
              {
                name: "Avançado",
                description: "Para startups em crescimento",
                price: "R$ 99",
                features: [
                  "6 blocos personalizáveis",
                  "Suporte em tempo real",
                  "Personalização avançada",
                  "Integrações de marketing",
                  "Análise de conversão"
                ],
                popular: true
              },
              {
                name: "Pro",
                description: "Controle total para startups escaláveis",
                price: "R$ 199",
                features: [
                  "Blocos ilimitados",
                  "Suporte dedicado",
                  "Layout exclusivo",
                  "Integrações premium",
                  "Exportação de dados",
                  "Multi-idiomas"
                ]
              }
            ].map((plan, index) => (
              <div
                key={index}
                className={`p-8 rounded-xl ${
                  plan.popular
                    ? 'bg-blue-600 text-white scale-105 shadow-xl'
                    : 'bg-white'
                }`}
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className={plan.popular ? 'text-blue-100' : 'text-gray-600'}>
                    {plan.description}
                  </p>
                  <div className="text-4xl font-bold mt-4">{plan.price}</div>
                  <div className={plan.popular ? 'text-blue-100' : 'text-gray-600'}>
                    /mês
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-white text-blue-600 hover:bg-gray-100'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Começar Agora
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para Impulsionar sua Startup?
          </h2>
          <p className="text-xl mb-8">
            Clique abaixo e crie sua página agora mesmo!
          </p>
          <button className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-full bg-white text-blue-600 hover:bg-gray-100 transition-colors transform hover:scale-105">
            Quero Começar!
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Sobre Nós</h3>
              <p className="text-sm">
                Ajudamos startups a crescerem mais rápido com landing pages otimizadas para conversão.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Redes Sociais</h3>
              <div className="flex space-x-4">
                {content.socialLinks?.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {link.icon && <i className={link.icon}></i>}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-sm">
              © 2025 Landing Creator Pro. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

