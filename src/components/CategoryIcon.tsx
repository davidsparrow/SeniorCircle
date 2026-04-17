import {
  Leaf, ChefHat, Archive, BookOpen, Laptop, Heart,
  BookMarked, PawPrint, ShoppingBag, Palette,
} from 'lucide-react'

const MAP: Record<string, React.ReactNode> = {
  'Yardwork':      <Leaf size={18} />,
  'Cooking':       <ChefHat size={18} />,
  'Organizing':    <Archive size={18} />,
  'Memoir Project':<BookOpen size={18} />,
  'Tech Help':     <Laptop size={18} />,
  'Companionship': <Heart size={18} />,
  'Reading Aloud': <BookMarked size={18} />,
  'Errands':       <ShoppingBag size={18} />,
  'Arts & Crafts': <Palette size={18} />,
  'Pet Care':      <PawPrint size={18} />,
}

export default function CategoryIcon({ category, size }: { category: string; size?: number }) {
  if (size) {
    const icons: Record<string, React.ReactNode> = {
      'Yardwork':      <Leaf size={size} />,
      'Cooking':       <ChefHat size={size} />,
      'Organizing':    <Archive size={size} />,
      'Memoir Project':<BookOpen size={size} />,
      'Tech Help':     <Laptop size={size} />,
      'Companionship': <Heart size={size} />,
      'Reading Aloud': <BookMarked size={size} />,
      'Errands':       <ShoppingBag size={size} />,
      'Arts & Crafts': <Palette size={size} />,
      'Pet Care':      <PawPrint size={size} />,
    }
    return <>{icons[category] ?? <Leaf size={size} />}</>
  }
  return <>{MAP[category] ?? <Leaf size={18} />}</>
}
