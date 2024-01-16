import * as dictionary from '@/dictionaries'

export function AppBanner() {
    const [firstText, secondText] = dictionary.home.banner

    return (
        <h1 className="mb-6 text-3xl font-extrabold md:text-5xl lg:text-6xl text-green-700">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">{firstText}</span> {secondText}
      </h1>
    )
}