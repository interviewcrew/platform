'use client'

import { supportedLangs, supportedKeyBindings } from '@/app/supportedIDEConfigs';
import MenuWithSecondary from './MenuWithSecondary';
import { useInterviewStore } from '@/store/interviewStore';

export function LanguageSelector() {
  const selectedLanguage = useInterviewStore((state) => state.language);
  const setSelectedLanguage = useInterviewStore((state) => state.setLanguage);

  return (
    <MenuWithSecondary
      label='Engine:'
      items={[...supportedLangs]}
      selectedItem={selectedLanguage}
      setSelectedItem={setSelectedLanguage}
      keySelector={l => l.id}
      primarySelector={l => l.language}
      secondarySelector={l => l.engine}
    />
  )
}

export function KeyBindingSelector() {
  const selectedKeyBinding = useInterviewStore((state) => state.keyBinding);
  const setSelectedKeyBinding = useInterviewStore((state) => state.setKeyBinding);

  return (
    <MenuWithSecondary
      label='Key Binding:'
      items={[...supportedKeyBindings]}
      selectedItem={selectedKeyBinding}
      setSelectedItem={setSelectedKeyBinding}
      keySelector={l => l.id}
      primarySelector={l => l.name}
      secondarySelector={l => l.description}
    />
  )
}

export function tabSizeSelector() {

}

export function fontSizeSelector() {

}