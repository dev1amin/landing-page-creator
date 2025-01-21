'use client'

import { ContentData } from '@/types/templates'
import Image from 'next/image'

interface Template4Props {
  content: ContentData
}

export default function Template4({ content }: Template4Props) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-purple-400 p-4">
        <div className="container mx-auto flex justify-between items-center">
          {content.images.logo && (
            <Image
              src={content.images.logo}
              alt="Logo"
              width={150}
              height={50}
              className="object-contain"
            />
          )}
          <button className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-purple-50 transition-colors">
            {content.ctaText || 'Solicitar Orçamento'}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                {content.title || 'Impressões de Alta Qualidade'}
              </h1>
              <p className="text-xl text-gray-300">
                {content.subtitle ||
                  'Garantimos o melhor prazo de entrega e qualidade excepcional para todos os tipos de impressão.'}
              </p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold py-4 px-8 rounded-lg transition-colors">
                {content.ctaText || 'Solicitar Orçamento'}
              </button>
            </div>
            <div className="relative h-[400px]">
              {content.images.hero && (
                <Image
                  src={content.images.hero}
                  alt="Impressão Digital"
                  fill
                  className="object-contain"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nossos Serviços
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {content.features?.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
              >
                <div className="text-4xl text-purple-600 mb-4">
                  {feature.icon && <i className={feature.icon}></i>}
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nosso Portfólio</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.images.additional.map((image, index) => (
              <div key={index} className="relative h-[200px] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={image}
                  alt={`Trabalho ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Por que Escolher-nos?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="text-4xl text-green-500">
                <i className="fas fa-truck"></i>
              </div>
              <h3 className="text-xl font-bold">Entrega Rápida</h3>
              <p className="text-gray-600">
                Garantimos prazos de entrega que atendem às suas necessidades.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="text-4xl text-blue-500">
                <i className="fas fa-leaf"></i>
              </div>
              <h3 className="text-xl font-bold">Impressão Sustentável</h3>
              <p className="text-gray-600">
                Utilizamos materiais e técnicas que respeitam o meio ambiente.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="text-4xl text-yellow-500">
                <i className="fas fa-award"></i>
              </div>
              <h3 className="text-xl font-bold">Qualidade Garantida</h3>
              <p className="text-gray-600">
                Oferecemos impressões de alta definição com cores vibrantes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-white">
        <div className="container mx-auto text-center space-y-4">
          <p className="text-sm">
            {content.footerText || '© 2025 Impressão Digital. Todos os direitos reservados.'}
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

