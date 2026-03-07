function OneCentreLogo({ showText = true }: { showText?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black">
        <span className="text-sm font-bold text-white">1C</span>
      </div>
      {showText && (
        <span className="font-semibold text-foreground">One Centre</span>
      )}
    </div>
  )
}

export default OneCentreLogo
