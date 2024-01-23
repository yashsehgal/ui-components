import { cn } from "@/helpers"

interface CardInterface extends React.HTMLAttributes<HTMLDivElement> {
  withHeader?: boolean;
  title?: string;
  description?: string;
  mainAction?: React.ReactNode;
}

const Card: React.FunctionComponent<CardInterface> = ({
  withHeader = false,
  title,
  description,
  mainAction = null,
  className,
  children,
  ...props
}) => {
  if (!withHeader) {
    return (
      <div className={cn("card-container p-6 rounded-xl border border-neutral-200 bg-white shadow", className)} {...props}>
        {children}
      </div>
    )
  } else {
    return (
      <div className={cn("card-container rounded-xl border border-neutral-200 bg-white shadow", className)} {...props}>
        <div className="card-header-separator border-b">
          <div className="card-header p-6 flex flex-row items-center justify-between max-sm:flex-col max-sm:items-stretch max-sm:gap-4  max-sm:w-full">
            <div>
              {title && <h1 className="text-xl font-semibold tracking-tighter">{title}</h1>}
              {description && <p className="text-sm text-neutral-500 tracking-tight">{description}</p>}
            </div>
            {mainAction && <>
              {mainAction}
            </>}
          </div>
        </div>
        <div className="card-body p-6">
          {children}
        </div>
      </div>
    )
  }
}

export {
  Card
}