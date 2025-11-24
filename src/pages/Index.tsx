import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Fighter {
  id: string;
  name: string;
  nickname: string;
  record: string;
  wins: number;
  losses: number;
  image?: string;
}

interface Fight {
  id: string;
  fighter1: Fighter;
  fighter2: Fighter;
  odds1: number;
  odds2: number;
  status: 'upcoming' | 'live' | 'finished';
  time?: string;
  views?: number;
}

const Index = () => {
  const [balance, setBalance] = useState(5000);
  const [activeTab, setActiveTab] = useState('fights');
  const [betAmount, setBetAmount] = useState<number>(0);
  const [selectedFight, setSelectedFight] = useState<string | null>(null);
  const [selectedFighter, setSelectedFighter] = useState<string | null>(null);

  const mockFights: Fight[] = [
    {
      id: '1',
      fighter1: {
        id: 'f1',
        name: 'Иван "Медведь"',
        nickname: 'Медведь',
        record: '12-3',
        wins: 12,
        losses: 3,
      },
      fighter2: {
        id: 'f2',
        name: 'Сергей "Молот"',
        nickname: 'Молот',
        record: '15-2',
        wins: 15,
        losses: 2,
      },
      odds1: 2.3,
      odds2: 1.65,
      status: 'live',
      views: 1247,
    },
    {
      id: '2',
      fighter1: {
        id: 'f3',
        name: 'Дмитрий "Волк"',
        nickname: 'Волк',
        record: '8-1',
        wins: 8,
        losses: 1,
      },
      fighter2: {
        id: 'f4',
        name: 'Александр "Буря"',
        nickname: 'Буря',
        record: '10-4',
        wins: 10,
        losses: 4,
      },
      odds1: 1.8,
      odds2: 2.1,
      status: 'upcoming',
      time: '20:00',
    },
    {
      id: '3',
      fighter1: {
        id: 'f5',
        name: 'Максим "Скала"',
        nickname: 'Скала',
        record: '18-5',
        wins: 18,
        losses: 5,
      },
      fighter2: {
        id: 'f6',
        name: 'Николай "Титан"',
        nickname: 'Титан',
        record: '14-3',
        wins: 14,
        losses: 3,
      },
      odds1: 1.95,
      odds2: 1.95,
      status: 'upcoming',
      time: '21:30',
    },
  ];

  const topFighters = [
    { rank: 1, name: 'Сергей "Молот"', record: '15-2', winRate: 88 },
    { rank: 2, name: 'Максим "Скала"', record: '18-5', winRate: 78 },
    { rank: 3, name: 'Николай "Титан"', record: '14-3', winRate: 82 },
    { rank: 4, name: 'Иван "Медведь"', record: '12-3', winRate: 80 },
    { rank: 5, name: 'Александр "Буря"', record: '10-4', winRate: 71 },
  ];

  const placeBet = (fightId: string, fighterId: string, amount: number) => {
    if (amount > balance) {
      alert('Недостаточно средств!');
      return;
    }
    setBalance(balance - amount);
    setSelectedFight(null);
    setSelectedFighter(null);
    setBetAmount(0);
    alert(`Ставка ${amount}₽ принята!`);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🥊</div>
              <h1 className="text-3xl font-bold glow-red tracking-wider">FIGHT CLUB</h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setActiveTab('fights')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeTab === 'fights' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                БОИ
              </button>
              <button
                onClick={() => setActiveTab('live')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeTab === 'live' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  LIVE
                </span>
              </button>
              <button
                onClick={() => setActiveTab('rating')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeTab === 'rating' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                РЕЙТИНГ
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeTab === 'profile' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                ПРОФИЛЬ
              </button>
            </nav>

            <div className="flex items-center gap-4">
              <div className="bg-muted px-4 py-2 rounded border border-primary/30 border-glow">
                <div className="text-xs text-muted-foreground">БАЛАНС</div>
                <div className="text-lg font-bold text-primary">{balance.toLocaleString()}₽</div>
              </div>
              <Button size="sm" variant="outline" className="border-primary/50 hover:bg-primary/10">
                <Icon name="Plus" size={16} className="mr-1" />
                Пополнить
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'fights' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-4xl font-bold glow-red">ПРЕДСТОЯЩИЕ БОИ</h2>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Icon name="Clock" size={16} />
                <span>Московское время</span>
              </div>
            </div>

            <div className="grid gap-6">
              {mockFights.map((fight) => (
                <Card key={fight.id} className="bg-card border-border overflow-hidden">
                  <div className="p-6">
                    {fight.status === 'live' && (
                      <div className="mb-4 flex items-center gap-2">
                        <Badge variant="destructive" className="animate-pulse">
                          <span className="w-2 h-2 bg-white rounded-full mr-2" />
                          LIVE
                        </Badge>
                        <span className="text-muted-foreground text-sm flex items-center gap-1">
                          <Icon name="Eye" size={14} />
                          {fight.views} зрителей
                        </span>
                      </div>
                    )}

                    <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
                      <div className="text-center space-y-2">
                        <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mx-auto border-2 border-primary/50 flex items-center justify-center text-4xl">
                          🥋
                        </div>
                        <h3 className="text-2xl font-bold">{fight.fighter1.name}</h3>
                        <div className="text-muted-foreground">
                          <span className="text-green-500">{fight.fighter1.wins}</span>-
                          <span className="text-red-500">{fight.fighter1.losses}</span>
                        </div>
                        <Button
                          onClick={() => {
                            setSelectedFight(fight.id);
                            setSelectedFighter('f1');
                          }}
                          variant="outline"
                          className="w-full border-primary/50 hover:bg-primary/20 hover:border-primary text-lg font-bold"
                        >
                          {fight.odds1}x
                        </Button>
                      </div>

                      <div className="flex flex-col items-center gap-4">
                        <div className="text-6xl font-bold text-muted-foreground/30">VS</div>
                        {fight.time && (
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground">НАЧАЛО</div>
                            <div className="text-2xl font-bold text-accent">{fight.time}</div>
                          </div>
                        )}
                      </div>

                      <div className="text-center space-y-2">
                        <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mx-auto border-2 border-primary/50 flex items-center justify-center text-4xl">
                          🥊
                        </div>
                        <h3 className="text-2xl font-bold">{fight.fighter2.name}</h3>
                        <div className="text-muted-foreground">
                          <span className="text-green-500">{fight.fighter2.wins}</span>-
                          <span className="text-red-500">{fight.fighter2.losses}</span>
                        </div>
                        <Button
                          onClick={() => {
                            setSelectedFight(fight.id);
                            setSelectedFighter('f2');
                          }}
                          variant="outline"
                          className="w-full border-primary/50 hover:bg-primary/20 hover:border-primary text-lg font-bold"
                        >
                          {fight.odds2}x
                        </Button>
                      </div>
                    </div>

                    {selectedFight === fight.id && (
                      <div className="mt-6 pt-6 border-t border-border space-y-4">
                        <div className="flex items-center gap-4">
                          <input
                            type="number"
                            value={betAmount || ''}
                            onChange={(e) => setBetAmount(Number(e.target.value))}
                            placeholder="Сумма ставки"
                            className="flex-1 bg-input border border-border rounded px-4 py-2 text-foreground"
                          />
                          <Button
                            onClick={() =>
                              placeBet(
                                fight.id,
                                selectedFighter!,
                                betAmount
                              )
                            }
                            disabled={!betAmount || betAmount <= 0}
                            className="bg-primary hover:bg-primary/90"
                          >
                            Сделать ставку {betAmount > 0 && `(${betAmount}₽)`}
                          </Button>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Возможный выигрыш:{' '}
                          <span className="text-accent font-bold">
                            {(
                              betAmount *
                              (selectedFighter === 'f1' ? fight.odds1 : fight.odds2)
                            ).toFixed(0)}
                            ₽
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'live' && (
          <div className="space-y-6">
            <h2 className="text-4xl font-bold glow-red">LIVE ТРАНСЛЯЦИИ</h2>
            <Card className="bg-card border-border overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative">
                <div className="absolute top-4 left-4">
                  <Badge variant="destructive" className="animate-pulse">
                    <span className="w-2 h-2 bg-white rounded-full mr-2" />
                    LIVE
                  </Badge>
                </div>
                <div className="text-center space-y-4">
                  <div className="text-8xl">📺</div>
                  <p className="text-xl text-muted-foreground">Трансляция начнется в 20:00</p>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Иван "Медведь" VS Сергей "Молот"</h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Eye" size={18} />
                    <span>1,247 зрителей</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'rating' && (
          <div className="space-y-6">
            <h2 className="text-4xl font-bold glow-red">РЕЙТИНГ БОЙЦОВ</h2>
            <Card className="bg-card border-border">
              <div className="p-6">
                <div className="space-y-4">
                  {topFighters.map((fighter) => (
                    <div
                      key={fighter.rank}
                      className="flex items-center gap-4 p-4 rounded bg-muted/50 border border-border hover:border-primary/50 transition-colors"
                    >
                      <div className="text-4xl font-bold text-primary w-12 text-center">
                        {fighter.rank}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold">{fighter.name}</h3>
                        <p className="text-muted-foreground">{fighter.record}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-sm text-muted-foreground">ПРОЦЕНТ ПОБЕД</div>
                        <div className="flex items-center gap-2">
                          <Progress value={fighter.winRate} className="w-24" />
                          <span className="text-lg font-bold text-accent">{fighter.winRate}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-4xl font-bold glow-red">МОЙ ПРОФИЛЬ</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold">Баланс</h3>
                  <div className="text-5xl font-bold text-primary">{balance.toLocaleString()}₽</div>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <Icon name="Plus" size={18} className="mr-2" />
                    Пополнить баланс
                  </Button>
                </div>
              </Card>

              <Card className="bg-card border-border">
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold">Статистика</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Всего ставок:</span>
                      <span className="font-bold">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Выигранных:</span>
                      <span className="font-bold text-green-500">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Проигранных:</span>
                      <span className="font-bold text-red-500">0</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="bg-card border-border">
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">История ставок</h3>
                <div className="text-center py-12 text-muted-foreground">
                  <Icon name="FileText" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>История ставок пуста</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>

      <footer className="border-t border-border bg-card/30 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>© 2024 FIGHT CLUB. Все права защищены.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-primary transition-colors">
                Правила
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Контакты
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
