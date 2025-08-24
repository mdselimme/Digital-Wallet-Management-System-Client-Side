import { Check } from "lucide-react";

import { Separator } from "@/components/ui/separator";

interface Pricing6Props {
  heading: string;
  description?: string;
  price?: string | number;
  priceSuffix?: string;
  features?: string[][];
  buttonText?: string;
}

const defaultFeatures = [["Cash In", "Cash Out", "Send Money"]];

const PricingPage = ({
  heading = "Pricing & Fees",
  description = "Pricing As Your Beyond.",
  price = 29,
  priceSuffix = "/mo",
  features = defaultFeatures,
}: Pricing6Props) => {
  return (
    <section className="pb-32 pt-10">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-semibold text-pretty lg:text-6xl mb-5">
          {heading}
        </h2>
        <p className="text-muted-foreground lg:text-xl text-center">
          {description}
        </p>
      </div>
      <div className="container mx-auto grid grid-cols-3 justify-between items-start">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="mx-auto flex w-full flex-col rounded-lg border p-6">
            <div className="flex justify-center">
              <span className="text-3xl font-semibold">
                Personal User Account
              </span>
            </div>
            <div className="my-6">
              {features.map((featureGroup, idx) => (
                <div key={idx}>
                  <ul className="flex flex-col gap-10">
                    {featureGroup.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between gap-2 text-sm font-medium"
                      >
                        {feature} <Check className="inline size-4 shrink-0" />
                      </li>
                    ))}
                  </ul>
                  {idx < features.length - 1 && <Separator className="my-6" />}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <div className="mx-auto flex w-full flex-col rounded-lg border p-6 sm:w-fit sm:min-w-80">
            <div className="flex justify-center">
              <span className="text-lg font-semibold">$</span>
              <span className="text-6xl font-semibold">{price}</span>
              <span className="self-end text-muted-foreground">
                {priceSuffix}
              </span>
            </div>
            <div className="my-6">
              {features.map((featureGroup, idx) => (
                <div key={idx}>
                  <ul className="flex flex-col gap-3">
                    {featureGroup.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between gap-2 text-sm font-medium"
                      >
                        {feature} <Check className="inline size-4 shrink-0" />
                      </li>
                    ))}
                  </ul>
                  {idx < features.length - 1 && <Separator className="my-6" />}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <div className="mx-auto flex w-full flex-col rounded-lg border p-6 sm:w-fit sm:min-w-80">
            <div className="flex justify-center">
              <span className="text-lg font-semibold">$</span>
              <span className="text-6xl font-semibold">{price}</span>
              <span className="self-end text-muted-foreground">
                {priceSuffix}
              </span>
            </div>
            <div className="my-6">
              {features.map((featureGroup, idx) => (
                <div key={idx}>
                  <ul className="flex flex-col gap-3">
                    {featureGroup.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between gap-2 text-sm font-medium"
                      >
                        {feature} <Check className="inline size-4 shrink-0" />
                      </li>
                    ))}
                  </ul>
                  {idx < features.length - 1 && <Separator className="my-6" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPage;
