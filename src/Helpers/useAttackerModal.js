import { useState } from 'react';

export function useAttackerModal(){
  const [isShowingAttackerModal, setIsShowingAttackerModal] = useState(false);

  function toggleAttackerModal() {
    setIsShowingAttackerModal(!isShowingAttackerModal);
  }

  return {
    isShowingAttackerModal,
    toggleAttackerModal,
  }
};