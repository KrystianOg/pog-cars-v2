'use client'
import {createContext, useContext, useMemo, useState} from 'react'
import { createPortal } from "react-dom"
import { Button, ButtonProps } from "../button"
import styles from './dialog.module.css'
import { Icon } from "@/components/icon"
import { AsChildProps, Slot } from '../slot'

export const DialogClose = (props: ButtonProps) => {
  const {close} = useContext(DialogContext)

  return (
    <Button {...props} onClick={close}/>
  )
}

export const DialogTrigger = (props: AsChildProps<ButtonProps>) => {
  const {open} = useContext(DialogContext)

  return (
    <Button {...props} onClick={open}/>
  )
}

export const DialogContent = ({children}: React.PropsWithChildren) => {
  const {isOpen, close} = useContext(DialogContext)

  if (!isOpen) return null

  return (
    <>
      {createPortal(<div className={styles.mask} onClick={close}/>, document.body)}
      {createPortal(<div className={styles.content}>
        {/* make it asChild */}
        <DialogClose asChild>
          <Icon kind="x-mark" size="sm"/>
        </DialogClose>
        {children}
      </div>, document.body)}
    </>
  )
}

interface DialogContextProps {
  close: () => void
  open: () => void
  isOpen: boolean
}

const DialogContext = createContext<DialogContextProps>(undefined!)

interface DialogProps extends React.ComponentProps<'div'> {}

export const Dialog = ({children }: DialogProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const value = useMemo(() => ({
    close: () => setOpen(false),
    open: () => setOpen(true),
    isOpen: open
  }), [open, setOpen])

  return (
    <DialogContext.Provider value={value}>
      {children}
    </DialogContext.Provider>
  )
}

