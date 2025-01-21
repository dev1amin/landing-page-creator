import { ContentData } from '@/types/templates'
import Image from 'next/image'

interface Template5Props {
  content: ContentData
}

export default function Template5({ content }: Template5Props) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-800 to-black text-white p-4">
        <div className="container mx-auto text-center">
          <p className="text-lg font-bold">
            Seja o Primeiro a Experimentar o Futuro: {content.title}
          </p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] bg-gray-100 rounded-lg shadow-xl p-8">
              {content.images.hero && (
                <Image
                  src={content.images.hero}
                  alt="Produto"
                  fill
                  className="object-contain"
                />
              )}
            </div>
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-poppins">
                {content.title || 'O Futuro Está Aqui'}
              </h1>
              <p className="text-xl text-gray-600">
                {content.subtitle || 'Experimente a tecnologia que vai transformar o mercado.'}
              </p>
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black text-xl font-bold py-4 px-8 rounded-lg transition-colors">
                {content.ctaText || 'Saiba Mais'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Video */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Veja em Ação</h2>
          <div className="max-w-4xl mx-auto aspect-video bg-black rounded-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-white">
              <p>Vídeo de Demonstração</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Principais Benefícios</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {content.features?.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-lg text-center"
              >
                <div className="text-4xl mb-4 text-blue-600">
                  {feature.icon && <i className={feature.icon}></i>}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exclusive Offers */}
      <section className="py-20 bg-gradient-to-r from-black to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Ofertas Exclusivas</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-900 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Básico</h3>
              <p className="text-3xl font-bold mb-6">R$ 97</p>
              <ul className="text-left space-y-4 mb-8">
                <li>✓ Suporte Técnico</li>
                <li>✓ Atualizações Gratuitas</li>
                <li>✓ Funcionalidades Básicas</li>
              </ul>
              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg transition-colors">
                Comprar Agora
              </button>
            </div>
            <div className="bg-blue-600 p-8 rounded-lg text-center transform scale-105">
              <h3 className="text-2xl font-bold mb-4">Premium</h3>
              <p className="text-3xl font-bold mb-6">R$ 197</p>
              <ul className="text-left space-y-4 mb-8">
                <li>✓ Todos os Recursos Básicos</li>
                <li>✓ Funcionalidades Avançadas</li>
                <li>✓ Suporte Prioritário</li>
              </ul>
              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg transition-colors">
                Comprar Agora
              </button>
            </div>
            <div className="bg-gray-900 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Ultimate</h3>
              <p className="text-3xl font-bold mb-6">R$ 297</p>
              <ul className="text-left space-y-4 mb-8">
                <li>✓ Funcionalidades Exclusivas</li>
                <li>✓ Suporte 24/7</li>
                <li>✓ Garantia Estendida</li>
              </ul>
              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg transition-colors">
                Comprar Agora
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

