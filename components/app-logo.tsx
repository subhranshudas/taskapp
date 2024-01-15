
export interface AppLogoProps extends React.HTMLProps<HTMLSpanElement> {
    children?: React.ReactNode;
}

export function AppLogo(props: AppLogoProps) {
    return (
        <span className="font-extrabold text-2xl text-blue-400" {...props}>taskapp</span>
    )
}