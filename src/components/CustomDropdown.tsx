import React, { useState, useRef, useEffect } from'react';
import { ChevronDown } from'lucide-react';

interface CustomDropdownProps {
 options: { value: string; label: string }[];
 value: string;
 onChange: (value: string) => void;
 placeholder?: string;
 disabled?: boolean;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
 options,
 value,
 onChange,
 placeholder ='Select an option',
 disabled = false,
}) => {
 const [isOpen, setIsOpen] = useState(false);
 const dropdownRef = useRef<HTMLDivElement>(null);

 const selectedOption = options.find((opt) => opt.value === value);

 // Close dropdown when clicking outside
 useEffect(() => {
 const handleClickOutside = (event: MouseEvent) => {
 if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
 setIsOpen(false);
 }
 };
 document.addEventListener('mousedown', handleClickOutside);
 return () => {
 document.removeEventListener('mousedown', handleClickOutside);
 };
 }, []);

 const handleOptionClick = (optionValue: string) => {
 onChange(optionValue);
 setIsOpen(false);
 };

 return (
 <div className="relative" ref={dropdownRef}>
 <button
 type="button"
 onClick={() => setIsOpen(!isOpen)}
 disabled={disabled}
 className="appearance-none w-full text-left px-3 sm:px-4 py-2 sm:py-3 border border-[var(--ud-border)] rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c8922a] focus:border-transparent transition-all duration-200 text-sm sm:text-base bg-[var(--ud-paper)] disabled:bg-[var(--ud-paper)] flex items-center justify-between"
 >
 <span className={selectedOption ?'text-[var(--ud-ink)]' :'text-[var(--ud-muted)]'}>
 {selectedOption ? selectedOption.label : placeholder}
 </span>
 <ChevronDown
 className={`h-4 w-4 text-[var(--ud-muted)] transition-transform duration-200 ${isOpen ?'rotate-180' :''
 }`}
 />
 </button>

 {isOpen && (
 <div className="absolute z-10 mt-2 w-full bg-[var(--ud-paper)] rounded-xl shadow-lg border border-[var(--ud-border)] max-h-60 overflow-y-auto">
 <ul className="py-1">
 {options.map((option) => (
 <li
 key={option.value}
 onClick={() => handleOptionClick(option.value)}
 className={`px-4 py-2 text-sm cursor-pointer hover:bg-[var(--ud-gold-pale)] ${value === option.value ?'bg-[var(--ud-gold-pale)] text-[var(--ud-gold)] font-semibold' :'text-[var(--ud-ink)]'
 }`}
 >
 {option.label}
 </li>
 ))}
 </ul>
 </div>
 )}
 </div>
 );
};

export default CustomDropdown;