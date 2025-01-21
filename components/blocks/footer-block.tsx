import { Block, ContentData } from '@/types/content'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import Image from 'next/image'

interface FooterBlockProps {
  block: Block
  content: ContentData
}

export default function FooterBlock({ block, content }: FooterBlockProps) {
  const footerContent = block.content as any
  const year = new Date().getFullYear()

  const socialIcons = {
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
    linkedin: Linkedin,
  }

  return (
    <div className="text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            {footerContent.logo && (
              <Image
                src={footerContent.logo}
                alt="Logo"
                width={150}
                height={40}
                className="mb-4"
              />
            )}
            <p className="text-sm">
              {footerContent.description || content.description}
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            {footerContent.contactInfo && (
              <div className="space-y-2">
                {footerContent.contactInfo.email && (
                  <a
                    href={`mailto:${footerContent.contactInfo.email}`}
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    {footerContent.contactInfo.email}
                  </a>
                )}
                {footerContent.contactInfo.phone && (
                  <a
                    href={`tel:${footerContent.contactInfo.phone}`}
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    {footerContent.contactInfo.phone}
                  </a>
                )}
                {footerContent.contactInfo.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {footerContent.contactInfo.address}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-8 pt-8" style={{ borderColor: footerContent.borderColor || '#374151' }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-center md:text-left">
              {footerContent.copyright || `© ${year} ${content.title}. Todos os direitos reservados.`}
            </p>

            {/* Social Links */}
            {footerContent.socialLinks && (
              <div className="flex space-x-4">
                {footerContent.socialLinks.map((social: any, index: number) => {
                  const Icon = socialIcons[social.platform as keyof typeof socialIcons]
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                      aria-label={`Visite nosso ${social.platform}`}
                    >
                      {Icon && <Icon className="h-5 w-5" />}
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          {footerContent.bottomText && (
            <p className="text-sm text-center mt-4">
              {footerContent.bottomText}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

