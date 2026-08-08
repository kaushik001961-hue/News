import ReporterIdCardFrontV5 from "./ReporterIdCardFrontV5";
import ReporterIdCardBackV5 from "./ReporterIdCardBackV5";
import PrintLayoutV5 from "./PrintLayoutV5";
import { ReporterCardData } from "./types";

interface Props {
  reporter: ReporterCardData;
}

export default function ReporterIdCardV5({
  reporter,
}: Props) {
  return (
    <PrintLayoutV5
      front={<ReporterIdCardFrontV5 reporter={reporter} />}
      back={<ReporterIdCardBackV5 reporter={reporter} />}
    />
  );
}