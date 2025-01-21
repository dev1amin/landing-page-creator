import { ContentData } from '@/types/templates'
import Image from 'next/image'

interface Template2Props {
  content: ContentData
}

export default function Template2({ content }: Template2Props) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gray-100 p-4">
        <div className="container mx-auto text-center">
          {content.images.logo && (
            <Image
              src={content.images.logo}
              alt="Logo"
              width={180}
              height={60}
              className="mx-auto"
            />
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px]">
        {content.images.hero && (
          <Image
            src={content.images.hero}
            alt="Hero"
            fill
            className="object-cover brightness-50"
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 shadow-text">
              {content.title || 'Transforme sua Empresa com Consultoria Especializada'}
            </h1>
            <form className="space-y-4 max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
              <input
                type="text"
                placeholder="Seu nome"
                className="w-full px-4 py-3 rounded-lg text-gray-900 border"
              />
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="w-full px-4 py-3 rounded-lg text-gray-900 border"
              />
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                {content.ctaText || 'Agendar Diagnóstico Gratuito'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* About the Consultancy */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-6 text-center">
            <h2 className="text-3xl font-bold">Sobre Nossa Consultoria</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {content.description ||
                'Ajudamos empresas a identificar oportunidades, otimizar processos e alcançar resultados expressivos por meio de estratégias personalizadas.'}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      {content.features && content.features.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Benefícios da Nossa Consultoria
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.features.map((feature, index) => (
                <div key={index} className="text-center">
                  {feature.icon && (
                    <div className="text-blue-600 text-4xl mb-4">
                      <i className={feature.icon}></i>
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Success Cases */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nossos Cases de Sucesso
          </h2>
          {content.testimonials && content.testimonials.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-600">{testimonial.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-blue-700 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">Vamos Transformar sua Empresa?</h2>
        <button className="bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-4 px-12 rounded-lg transition-colors">
          {content.ctaText || 'Solicitar Diagnóstico'}
        </button>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-white">
        <div className="container mx-auto text-center space-y-4">
          <p className="text-sm">
            {content.footerText || '© 2025 Consultoria Empresarial. Todos os direitos reservados.'}
          </p>
          <div className="flex justify-center gap-4">
            {content.socialLinks?.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-400 transition-colors"
              >
                {link.icon && <i className={link.icon}></i>}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

