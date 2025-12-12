import React from 'react'
import { HeroSection } from './sections/HeroSection'
import { AboutSection } from './sections/AboutSection'
import { TestimonialsSection } from './sections/TestiminalSection'
import { SkillsSection } from './sections/SkillsSection'
import { ExperienceSection } from './sections/ExperienceSection'
import { EducationSection } from './sections/EducationSection'
import { ProjectsSection } from './sections/ProjectsSection'
import { CertificationsSection } from './sections/CertificationsSection'
import {AchievementsSection} from './sections/ArchievementSection'
import { ServicesSection } from './sections/ServicesSection'
import { BlogSection } from './sections/BlogSection'
import { ContactSection } from './sections/ContactSection'
const PortfolioContent = () => {
  return (
    <div>
      <HeroSection/>
      <AboutSection/>
      <TestimonialsSection/>
      <SkillsSection/>
      <ExperienceSection/>
      <EducationSection/>
      <ProjectsSection/>
      <CertificationsSection/>
      <AchievementsSection/>
      <ServicesSection/>
      <BlogSection/>
      <ContactSection/>
    </div>
  )
}

export default PortfolioContent