"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<string, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}

export function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"];
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center text-xs",
          className,
        )}
        {...props}
      >
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

export const ChartTooltip = RechartsPrimitive.Tooltip;

export function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  label,
}: any) {
  const { config } = useChart();

  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
        className,
      )}
    >
      {!hideLabel && <div className="font-medium">{label}</div>}
      <div className="grid gap-1.5">
        {payload.map((item: any, index: number) => {
          const configItem = config[item.dataKey || item.name];
          return (
            <div key={index} className="flex items-center gap-2">
              {indicator === "dot" && (
                <div 
                  className="h-2 w-2 rounded-full" 
                  style={{ backgroundColor: item.color || item.fill }} 
                />
              )}
              <span className="text-muted-foreground">{configItem?.label || item.name}:</span>
              <span className="font-mono font-medium">{item.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const ChartLegend = RechartsPrimitive.Legend;

export function ChartLegendContent({ payload, className }: any) {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div className={cn("flex items-center justify-center gap-4 pt-3", className)}>
      {payload.map((item: any, index: number) => {
        const configItem = config[item.dataKey || item.value];
        return (
          <div key={index} className="flex items-center gap-1.5">
            <div 
              className="h-2 w-2 rounded-[2px]" 
              style={{ backgroundColor: item.color }} 
            />
            <span>{configItem?.label || item.value}</span>
          </div>
        );
      })}
    </div>
  );
}

export function ChartStyle({ id, config }: any) {
  return null;
}
