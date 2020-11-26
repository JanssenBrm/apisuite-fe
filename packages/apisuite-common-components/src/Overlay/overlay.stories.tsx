import React, { useState } from 'react'
import Overlay from './overlay'

export default {
  title: 'Overlay',
  component: Overlay,
}

const ipsum = () => (
  <>
    <p>
      Vel ultrices molestie mi cubilia praesent platea dictumst quis enim libero
      hac cum. Sagittis mattis, pharetra sapien ultricies nisl porta faucibus
      interdum hac non. Ante arcu integer ligula ridiculus, venenatis elit
      ornare semper. Porttitor in dui porttitor mollis. Commodo congue
      vestibulum proin adipiscing faucibus fames vel aliquet congue turpis
      dignissim quisque. Turpis senectus ligula suspendisse. Montes blandit
      vulputate ultrices lectus. Ultrices magnis ornare, fames molestie aliquet
      pharetra semper facilisi. Torquent euismod curabitur lorem varius sagittis
      sagittis hac nostra at gravida! Bibendum ultrices aptent nam accumsan nam
      facilisis nunc felis ridiculus. Imperdiet nunc proin suscipit tempor
      lacinia litora. Vitae scelerisque laoreet cum. Semper est egestas eleifend
      hendrerit eget consectetur, etiam inceptos lectus! Sapien ante consequat
      porttitor tempor luctus feugiat consequat. Vitae lacinia lorem eget dolor
      purus tempus metus potenti ligula himenaeos. Taciti eleifend, nostra erat.
      Velit nunc platea metus elementum himenaeos vulputate, risus egestas
      elementum venenatis montes ut.
    </p>
    <p>
      Aliquam bibendum sem sociis inceptos; odio pharetra sapien. Velit semper
      vel interdum laoreet arcu est pharetra condimentum scelerisque aptent
      placerat pretium. Pellentesque risus ipsum mi in donec mauris fermentum
      cras vitae? Velit etiam rutrum orci ante justo. Sociis dolor blandit
      curae; orci nascetur nibh varius. Dictum, tellus torquent morbi proin dis.
      Mi penatibus curae; nostra velit feugiat non nisi. Mi sollicitudin ipsum
      fermentum fames. Per sit quis porttitor quam ullamcorper vel habitasse per
      volutpat sapien. Quis tellus ultricies molestie conubia! Nullam vitae
      luctus massa mollis et quisque nisl; consectetur inceptos porttitor dolor.
      Nullam dis pretium etiam integer quisque tincidunt gravida rhoncus
      vulputate conubia. Suscipit nec dui ornare orci nulla platea penatibus
      amet parturient quam turpis a. Amet eu, primis fringilla. Habitasse.
    </p>
    <p>
      Odio per leo dictumst eu torquent feugiat nec? Scelerisque sollicitudin
      nullam felis lorem leo lectus litora blandit pretium tempus aliquam
      feugiat. Dapibus nullam, magna convallis? Natoque egestas in nam purus
      risus amet convallis facilisi mauris eu elit. Diam nulla condimentum id
      platea penatibus ultricies lobortis! Nisl fringilla posuere orci integer.
      Blandit ac gravida morbi molestie class fringilla phasellus fames. Proin
      sagittis diam eget vel sed. Sed nostra dictumst eleifend potenti vitae
      sapien nullam amet blandit dis accumsan sagittis? Aenean cum risus,
      placerat consequat. Vulputate tellus turpis per. Class donec pretium a
      dictum risus. Varius.
    </p>
    <p>
      Curabitur parturient sed aliquet quis. Dignissim aliquet ligula commodo
      ullamcorper tellus dictum lobortis eros cras. Congue vel magna tristique
      posuere pretium proin erat. Class vitae imperdiet porta lacinia natoque
      potenti. Sit, tellus class class maecenas iaculis dictumst non
      pellentesque libero. Ut rhoncus rutrum at turpis vulputate potenti. Massa
      amet libero dui hac. Class consequat conubia rutrum? Vulputate urna, cum
      enim consectetur parturient faucibus bibendum metus nullam facilisi. Velit
      amet morbi, aliquet vivamus parturient? Velit et.
    </p>
    <p>
      Habitant lobortis sodales sapien, fermentum netus laoreet! Fermentum
      torquent netus dictum pulvinar mauris ligula tellus tristique! Torquent
      aenean suspendisse parturient lorem torquent varius sed nunc. Pretium
      sollicitudin purus, hendrerit sapien cursus. Cras nascetur ut tincidunt
      elementum mauris adipiscing volutpat facilisis. Urna senectus auctor
      elementum sit porttitor ullamcorper phasellus. Magnis venenatis aptent
      rhoncus nam quisque aenean malesuada curabitur. Congue class habitasse.
    </p>
  </>
)

export const Default = (): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Overlay</button>
      <Overlay open={isOpen} onClose={() => setIsOpen(false)}>
        <h1>Overlay</h1>
        {ipsum()}
        <button onClick={() => setIsOpen(false)}>Close Overlay</button>
      </Overlay>
    </>
  )
}

export const WithLogo = (): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Overlay</button>
      <Overlay open={isOpen} showLogo={true} onClose={() => setIsOpen(false)}>
        <h1>Overlay</h1>
        {ipsum()}
        <button onClick={() => setIsOpen(false)}>Close Overlay</button>
      </Overlay>
    </>
  )
}

export const WithLogoBlank = (): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Overlay</button>
      <Overlay
        open={isOpen}
        showLogo={true}
        blankLogo={true}
        onClose={() => setIsOpen(false)}
      >
        <h1>Overlay</h1>
        {ipsum()}
        <button onClick={() => setIsOpen(false)}>Close Overlay</button>
      </Overlay>
    </>
  )
}

export const WithLogoNoTopNavBackgroud = (): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Overlay</button>
      <Overlay
        open={isOpen}
        showLogo={true}
        noTopBg={true}
        onClose={() => setIsOpen(false)}
      >
        <h1>Overlay</h1>
        {ipsum()}
        <button onClick={() => setIsOpen(false)}>Close Overlay</button>
      </Overlay>
    </>
  )
}

export const WithLogoAndTitle = (): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Overlay</button>
      <Overlay
        open={isOpen}
        showLogo={true}
        title="APISuite Common Component Lib"
        onClose={() => setIsOpen(false)}
      >
        <h1>Overlay</h1>
        {ipsum()}
        <button onClick={() => setIsOpen(false)}>Close Overlay</button>
      </Overlay>
    </>
  )
}
