'use client'

import { ContentData } from '@/types/templates'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface Template3Props {
  content: ContentData
}

export default function Template3({ content }: Template3Props) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gray-900 p-4 text-white text-center">
        <div className="container mx-auto">
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
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-800">
                {content.title || 'Especialistas em Soluções Jurídicas Personalizadas'}
              </h1>
              <p className="text-xl text-gray-600">
                {content.subtitle ||
                  'Resolva seus problemas jurídicos com eficiência e confiança.'}
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-4 px-8 rounded-lg transition-colors w-full md:w-auto">
                {content.ctaText || 'Agendar Consulta'}
              </button>
            </div>
            <div className="relative h-[400px]">
              {content.images.hero && (
                <Image
                  src={content.images.hero}
                  alt="Advocacia"
                  fill
                  className="object-contain"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Áreas de Atuação</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {content.features?.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg bg-white shadow-lg"
              >
                <div className="text-blue-600 text-4xl mb-4">
                  {feature.icon && <i className={feature.icon}></i>}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-6 text-center">
            <h2 className="text-3xl font-bold">Sobre Nosso Escritório</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {content.description ||
                'Com anos de experiência e um time de especialistas, garantimos as melhores soluções para atender suas demandas jurídicas com excelência.'}
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {content.testimonials && content.testimonials.length > 0 && (
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              O Que Nossos Clientes Dizem
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg"
                >
                  <p className="text-gray-600 mb-4">{testimonial.text}</p>
                  <div className="flex items-center gap-3">
                    {testimonial.image && (
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    )}
                    <p className="font-semibold">{testimonial.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-blue-800 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">Agende Sua Consulta Agora</h2>
        <button className="bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-4 px-12 rounded-lg transition-colors">
          {content.ctaText || 'Agendar Consulta'}
        </button>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-white">
        <div className="container mx-auto text-center space-y-4">
          <p className="text-sm">
            {content.footerText ||
              '© 2025 Escritório de Advocacia. Todos os direitos reservados.'}
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

