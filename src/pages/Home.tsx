import React from 'react'
import {
  Hero,
  Difference,
  Intro,
  Benefits,
  Testimonials,
  Examples,
  Comparison,
  Steps,
  Call,
  Deliverables,
  Contact
} from '@sections'
import { Button, Icon } from '@ui'
import {
  carouselImages,
  heroImage,
  moneyImage,
  statsImage,
  accordionItems,
  formBtn,
  handleMyFormSubmit,
  myFormFields,
  benefits,
  call,
  comparison,
  contact,
  deliverables,
  diff,
  examples,
  hero,
  intro,
  steps,
  testimonials,
  card,
  cardList,
  listVideos,
  video,
  lists,
  emailConfig
} from '@constants'
import { submitConfig } from '@/config/submitConfig'

const Home: React.FC = () => {
  const sections = [
    {
      id: 'hero',
      content: (
        <Hero
          heroImage={heroImage}
          statsImage={statsImage}
          sectionTitle={hero.title}
          descriptionText={hero.text}
        />
      )
    },
    {
      id: 'difference',
      content: (
        <Difference
          sectionTitle={diff.title}
          cardDarkTitle={card.cardDarkTitle}
          cardDarkListItems={card.cardDarkItems}
          cardDarkDescription={card.cardDarkText}
          cardLightTitle={card.cardLightTitle}
          cardLightListItems={card.cardLightItems}
          cardLightDescription={card.cardLightText}
        />
      )
    },
    {
      id: 'intro',
      content: (
        <Intro
          thumbnail={video.tumb}
          videoSrc={video.src}
          sectionTitle={intro.title}
        />
      )
    },
    {
      id: 'benefits',
      content: (
        <Benefits sectionTitle={benefits.title} listItems={lists.benefits} />
      )
    },
    {
      id: 'testimonials',
      content: (
        <Testimonials videos={listVideos} sectionTitle={testimonials.title} />
      )
    },
    {
      id: 'examples',
      content: (
        <Examples carousels={carouselImages} sectionTitle={examples.title} />
      )
    },
    {
      id: 'comparison',
      content: (
        <Comparison sectionTitle={comparison.title} cardsData={cardList} />
      )
    },
    {
      id: 'steps',
      content: (
        <Steps
          sectionTitle={steps.title}
          descriptionText={steps.text}
          timelineItems={lists.steps}
        />
      )
    },
    {
      id: 'deliverables',
      content: (
        <Deliverables
          sectionTitle={deliverables.title}
          descriptionText={deliverables.text}
          accordionItems={accordionItems}
        />
      )
    },
    {
      id: 'call',
      content: (
        <Call
          heroImage={moneyImage}
          sectionTitle={call.title}
          descriptionText={call.text}
        />
      )
    },
    {
      id: 'contact',
      content: (
        <Contact
          sectionTitle={contact.title}
          descriptionText={contact.text}
          fields={myFormFields}
          submitButtonText={formBtn.text}
          onSubmit={handleMyFormSubmit}
          buttonProps={formBtn.props}
          security={contact.security}
          submitConfig={submitConfig}
        />
      )
    }
  ]

  return (
    <>
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="px-6 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto w-full">{section.content}</div>
        </section>
      ))}
      <Button
        fixed={true}
        position="bottom-center"
        targetSection="contact"
        hideOnSection={true}
        size="md"
        icon={<Icon type="eye" color="#000" />}
        className="uppercase font-extrabold"
      >
        Quero uma Marca Intencional
      </Button>
    </>
  )
}

export default Home
