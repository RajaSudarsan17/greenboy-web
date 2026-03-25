import Icon from '@/components/ui/AppIcon';

interface Stat {
  label: string;
  value: string;
  icon: string;
  color: string;
}

interface ProductionStatsProps {
  stats: Stat[];
}

const ProductionStats = ({ stats }: ProductionStatsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-card rounded-lg p-4 shadow-md">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${stat.color}`}>
            <Icon name={stat.icon as any} size={20} variant="solid" className="text-white" />
          </div>
          <div className="text-2xl font-headline text-text-primary mb-1">{stat.value}</div>
          <div className="text-xs text-text-secondary">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default ProductionStats;