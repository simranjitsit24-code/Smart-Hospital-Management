import { useMemo } from 'react';

const roomStatusLegend = [
  { label: 'Available', tone: 'bg-emerald-400' },
  { label: 'Occupied', tone: 'bg-rose-400' },
  { label: 'Reserved', tone: 'bg-amber-300' },
  { label: 'Cleaning', tone: 'bg-violet-400' },
];

const FLOOR_WARDS = ['General', 'ICU', 'Private', 'Semi-Private', 'Maternity', 'Surgical'];

const RoomsPage = ({ rooms, searchTerm }) => {
  const totalFloors = 6;
  const roomsPerFloor = 100;

  const roomMap = {};
  rooms.forEach(room => { roomMap[room.roomNumber] = room; });

  // Generate all 600 rooms – memoized
  const allRooms = useMemo(() => {
    const result = [];
    for (let floor = 1; floor <= totalFloors; floor++) {
      const floorStr = String(floor).padStart(2, '0');
      const ward = FLOOR_WARDS[floor - 1];
      for (let num = 1; num <= roomsPerFloor; num++) {
        const roomNumber = `${floorStr}-${String(num).padStart(3, '0')}`;
        const existing = roomMap[roomNumber];
        result.push(existing || { roomNumber, ward, totalBeds: 2, occupiedBeds: 0, status: 'Available' });
      }
    }
    return result;
  }, [rooms]); // only re‑generate when rooms change

  // Filter and group – also memoized
  const { floorGroups, sortedFloors } = useMemo(() => {
    const filtered = searchTerm ? allRooms.filter(r => r.roomNumber.includes(searchTerm)) : allRooms;
    const groups = {};
    filtered.forEach(r => {
      const floor = r.roomNumber.split('-')[0];
      if (!groups[floor]) groups[floor] = [];
      groups[floor].push(r);
    });
    return {
      floorGroups: groups,
      sortedFloors: Object.keys(groups).sort(),
    };
  }, [allRooms, searchTerm]);

  if (sortedFloors.length === 0) {
    return <p className="text-slate-400">No rooms match your search.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">Floor‑wise Room Grid</h2>
        <div className="flex flex-wrap gap-2">
          {roomStatusLegend.map(item => (
            <span key={item.label} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
              <span className={`mr-1 inline-block h-2.5 w-2.5 rounded-full ${item.tone}`} /> {item.label}
            </span>
          ))}
        </div>
      </div>
      {sortedFloors.map(floor => (
        <div key={floor} className="rounded-2xl border border-white/10 bg-slate-900/50 p-4">
          <h3 className="text-xl font-semibold text-cyan-200">Floor {floor}</h3>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
            {floorGroups[floor].map(room => (
              <div
                key={room.roomNumber}
                className={`rounded-2xl border p-3 text-center transition hover:scale-105 ${
                  room.status === 'Available' ? 'border-emerald-500/30 bg-emerald-500/10' :
                  room.status === 'Occupied' ? 'border-rose-500/30 bg-rose-500/10' :
                  room.status === 'Reserved' ? 'border-amber-500/30 bg-amber-500/10' :
                  'border-violet-500/30 bg-violet-500/10'
                }`}
              >
                <p className="text-sm font-bold text-white">{room.roomNumber}</p>
                <p className="text-xs text-slate-400">{room.ward}</p>
                <p className="text-xs text-slate-300">{room.occupiedBeds}/{room.totalBeds} beds</p>
                <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[0.65rem] font-semibold ${
                  room.status === 'Available' ? 'bg-emerald-400/20 text-emerald-200' :
                  room.status === 'Occupied' ? 'bg-rose-400/20 text-rose-200' :
                  room.status === 'Reserved' ? 'bg-amber-300/20 text-amber-200' :
                  'bg-violet-400/20 text-violet-200'
                }`}>{room.status}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomsPage;