import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden border bg-background">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          alt="Tour banner"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 dark:bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 py-20 md:px-12 md:py-28">
        <div className="max-w-3xl space-y-6 text-white">
          <Badge className="w-fit bg-primary text-primary-foreground">
            🌴 Best Tour Packages 2025
          </Badge>

          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            Discover Amazing Places <br /> With Comfort & Style
          </h1>

          <p className="text-lg text-white/90 md:text-xl">
            Explore hand-picked destinations, luxury stays, and unforgettable
            experiences at the best price.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg" className="gap-2">
              <MapPin className="h-5 w-5" />
              Explore Tours
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
