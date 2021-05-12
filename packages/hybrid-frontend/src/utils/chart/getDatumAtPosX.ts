import { bisector } from 'd3-array';
import { ScaleTime } from 'd3-scale';

export interface GetDatumAtPosXProps<Datum> {
  data: Datum[];

  // This should take into account chart margins e.g. if there's a left margin
  // of 20, then the posX provided should probably be mouseX - 20.
  posX: number;

  xScale: ScaleTime<number, number>;

  dateAccessor: (d: Datum) => Date;
}

/**
 * Find the corresponding data point for a given X coordinate. This is useful
 * when determining on-hover tooltip data, for example.
 */
export default function getDatumAtPosX<Datum>({
  data,
  posX,
  xScale,
  dateAccessor,
}: GetDatumAtPosXProps<Datum>): Datum {
  const dateAtMouseX = xScale.invert(posX);

  const bisectDate = bisector<Datum, Date>(dateAccessor).left;
  const bisectedIndex = bisectDate(data, dateAtMouseX, 1);

  const datum0 = data[bisectedIndex - 1];
  const datum1 = data[bisectedIndex];

  let datum: Datum = datum0;

  if (datum1 && dateAccessor(datum1)) {
    const distance1 = dateAtMouseX.valueOf() - dateAccessor(datum0).valueOf();
    const distance2 = dateAccessor(datum1).valueOf() - dateAtMouseX.valueOf();

    datum = distance1 > distance2 ? datum1 : datum0;
  }

  return datum;
}
