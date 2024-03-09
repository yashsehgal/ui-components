/* eslint-disable react-hooks/exhaustive-deps */
import { cn } from '@/helpers';
import { Check } from 'lucide-react';
import { forwardRef, useEffect, useState } from 'react';

export interface MultiSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  options: string[];
  setOptions: (options: string[]) => void;
}

export const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(
  ({ className, options, setOptions, ...args }, ref) => {
    const [selected, setSelected] = useState<string[]>([]);
    const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
    const [query, setQuery] = useState<string>('');
    const [isSelectionFocused, setIsSelectionFocused] =
      useState<boolean>(false);

    useEffect(() => setFilteredOptions(options), [options]);

    useEffect(() => {
      if (query.length) {
        filterOptions();
      } else {
        setFilteredOptions(options);
      }
    }, [query]);

    const filterOptions = () => {
      let _updatedFilteration = options.filter((item) => {
        return item.includes(query);
      });

      setFilteredOptions(_updatedFilteration);
    };

    return (
      <>
        <div
          ref={ref}
          className={cn(
            'multiselect-container px-4 py-2 rounded-md border min-w-[420px] w-fit flex flex-row items-center justify-start gap-2',
            className,
          )}
          aria-labelledby="input-box"
          {...args}>
          {selected.length ? (
            <div className="selected-options-wrapper flex flex-row items-center justify-start gap-1">
              {selected.map((selection: string, index: number) => {
                return (
                  <MultiSelectBadge key={index}>{selection}</MultiSelectBadge>
                );
              })}
            </div>
          ) : (
            <></>
          )}
          <input
            className="focus:outline-none placeholder:text-sm"
            placeholder="Select fruits..."
            onChange={(e) => setQuery(e.target.value as string)}
            value={query}
            onFocus={() => setIsSelectionFocused(true)}
          // onBlur={() => setIsSelectionFocused(false)}
          />
        </div>
        {isSelectionFocused && (
          <div className="options-list-container grid w-fit border p-2">
            {filteredOptions.length ? (
              filteredOptions.map((option: string, index: number) => {
                return (
                  <button
                    key={index}
                    className="text-left flex flex-row items-center justify-start gap-2 px-4 py-1 w-[420px] hover:bg-gray-100"
                    onClick={() => {
                      if (selected.includes(option)) {
                        let removedOptionArray = [...selected];
                        removedOptionArray = removedOptionArray.filter(
                          (item) => item !== option,
                        );
                        setSelected(removedOptionArray);
                      } else {
                        let updatedOptions = [...selected];
                        updatedOptions.push(option);
                        setSelected(updatedOptions);
                      }
                      setQuery('');
                    }}>
                    {option}
                    {selected.includes(option) && <Check className="w-4 h-4" />}
                  </button>
                );
              })
            ) : (
              <span className="text-xs text-gray-400 select-none cursor-default">
                No options found
              </span>
            )}
          </div>
        )}
      </>
    );
  },
);

MultiSelect.displayName = 'MultiSelect';

const MultiSelectBadge: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, children, ...args }) => {
  return (
    <div
      className={cn(
        'multiselect-badge w-fit h-fit rounded-full px-2 py-1 bg-gray-700 text-white flex flex-row items-center justify-center gap-1 text-xs',
        className,
      )}
      {...args}>
      {children}
    </div>
  );
};
