"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

/**
 * Render a Popover root element marked with `data-slot="popover"` and pass through all received props.
 *
 * @returns The rendered Radix Popover root element.
 */
function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

/**
 * Render a Popover trigger element for use with Radix Popover primitives.
 *
 * @returns A Popover trigger React element with `data-slot="popover-trigger"` and all provided props applied.
 */
function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

/**
 * Renders popover content inside a Portal with configurable alignment and side offset.
 *
 * @param className - Additional CSS class names to merge with the component's default styles.
 * @param align - Horizontal alignment of the content relative to the trigger; defaults to `"center"`.
 * @param sideOffset - Distance in pixels between the trigger and the content; defaults to `4`.
 * @returns The rendered PopoverPrimitive.Content element with default styling and `data-slot="popover-content"`.
 */
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

/**
 * Renders a Radix popover anchor element with a `data-slot="popover-anchor"` attribute and forwards all received props.
 *
 * @param props - Props to pass through to `PopoverPrimitive.Anchor`
 * @returns The `PopoverPrimitive.Anchor` element with forwarded props and the `data-slot="popover-anchor"` attribute
 */
function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }