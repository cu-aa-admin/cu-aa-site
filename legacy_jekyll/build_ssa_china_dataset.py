import requests
import time
import pandas as pd

# =========================
# CONFIG
# =========================

YEAR = 2023  # change to 2022, etc. if needed

# Optional: path to your local CSV with China-specific metrics
# Columns expected: iso3, china_trade_share_pct, china_debt_stock_pct_gdp
CHINA_METRICS_CSV = "china_metrics_ssa.csv"  # you will create this file

OUTPUT_CSV = f"ssa_china_dataset_{YEAR}.csv"

# =========================
# COUNTRY LIST (Sub-Saharan Africa)
# World Bank ISO3 country codes
# =========================

SSA_COUNTRIES = [
    {"name": "Angola",                      "iso3": "AGO"},
    {"name": "Benin",                       "iso3": "BEN"},
    {"name": "Botswana",                    "iso3": "BWA"},
    {"name": "Burkina Faso",                "iso3": "BFA"},
    {"name": "Burundi",                     "iso3": "BDI"},
    {"name": "Cabo Verde",                  "iso3": "CPV"},
    {"name": "Cameroon",                    "iso3": "CMR"},
    {"name": "Central African Republic",    "iso3": "CAF"},
    {"name": "Chad",                        "iso3": "TCD"},
    {"name": "Comoros",                     "iso3": "COM"},
    {"name": "Congo, Republic of",          "iso3": "COG"},
    {"name": "Congo, Democratic Republic of","iso3": "COD"},
    {"name": "Côte d’Ivoire",               "iso3": "CIV"},
    {"name": "Djibouti",                    "iso3": "DJI"},
    {"name": "Equatorial Guinea",           "iso3": "GNQ"},
    {"name": "Eritrea",                     "iso3": "ERI"},
    {"name": "Eswatini",                    "iso3": "SWZ"},  # WB still uses SWZ
    {"name": "Ethiopia",                    "iso3": "ETH"},
    {"name": "Gabon",                       "iso3": "GAB"},
    {"name": "Gambia",                      "iso3": "GMB"},
    {"name": "Ghana",                       "iso3": "GHA"},
    {"name": "Guinea",                      "iso3": "GIN"},
    {"name": "Guinea-Bissau",               "iso3": "GNB"},
    {"name": "Kenya",                       "iso3": "KEN"},
    {"name": "Lesotho",                     "iso3": "LSO"},
    {"name": "Liberia",                     "iso3": "LBR"},
    {"name": "Madagascar",                  "iso3": "MDG"},
    {"name": "Malawi",                      "iso3": "MWI"},
    {"name": "Mali",                        "iso3": "MLI"},
    {"name": "Mauritania",                  "iso3": "MRT"},
    {"name": "Mauritius",                   "iso3": "MUS"},
    {"name": "Mozambique",                  "iso3": "MOZ"},
    {"name": "Namibia",                     "iso3": "NAM"},
    {"name": "Niger",                       "iso3": "NER"},
    {"name": "Nigeria",                     "iso3": "NGA"},
    {"name": "Rwanda",                      "iso3": "RWA"},
    {"name": "São Tomé and Príncipe",       "iso3": "STP"},
    {"name": "Senegal",                     "iso3": "SEN"},
    {"name": "Seychelles",                  "iso3": "SYC"},
    {"name": "Sierra Leone",                "iso3": "SLE"},
    {"name": "Somalia",                     "iso3": "SOM"},
    {"name": "South Africa",                "iso3": "ZAF"},
    {"name": "South Sudan",                 "iso3": "SSD"},
    {"name": "Sudan",                       "iso3": "SDN"},
    {"name": "Tanzania",                    "iso3": "TZA"},
    {"name": "Togo",                        "iso3": "TGO"},
    {"name": "Uganda",                      "iso3": "UGA"},
    {"name": "Zambia",                      "iso3": "ZMB"},
    {"name": "Zimbabwe",                    "iso3": "ZWE"},
]

# =========================
# WORLD BANK API HELPER
# =========================

WB_BASE_URL = "https://api.worldbank.org/v2/country/{country}/indicator/{indicator}"


def get_indicator_value(iso3: str, indicator: str, year: int):
    """
    Fetch a single indicator value for a given country and year
    from the World Bank API.

    Returns a float or None.
    """
    url = WB_BASE_URL.format(country=iso3, indicator=indicator)
    params = {
        "format": "json",
        "per_page": 1,
        "date": str(year),
    }

    try:
        resp = requests.get(url, params=params, timeout=10)
        resp.raise_for_status()
        data = resp.json()
    except Exception as e:
        print(f"Error fetching {indicator} for {iso3}: {e}")
        return None

    # World Bank returns [metadata, [data...]]
    if not isinstance(data, list) or len(data) < 2 or not data[1]:
        print(f"No data for {indicator} {iso3} {year}")
        return None

    value = data[1][0].get("value", None)
    if value is None:
        return None

    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def fetch_all_indicators(year: int):
    """
    Fetch population, GDP, and external debt (% of GNI) for all SSA countries.
    Returns a pandas DataFrame.
    """
    rows = []
    # WB indicator codes
    POP_IND = "SP.POP.TOTL"        # Population, total
    GDP_IND = "NY.GDP.MKTP.CD"     # GDP (current US$)
    DEBT_IND = "DT.DOD.DECT.GN.ZS" # External debt stocks, total (% of GNI)

    for c in SSA_COUNTRIES:
        iso3 = c["iso3"]
        name = c["name"]
        print(f"Fetching data for {name} ({iso3})...")

        pop = get_indicator_value(iso3, POP_IND, year)
        gdp = get_indicator_value(iso3, GDP_IND, year)
        debt_pct_gni = get_indicator_value(iso3, DEBT_IND, year)

        rows.append(
            {
                "country": name,
                "iso3": iso3,
                "year": year,
                "population": pop,
                "gdp_current_usd": gdp,
                "external_debt_pct_gni": debt_pct_gni,
            }
        )

        # Be gentle with the API
        time.sleep(0.2)

    df = pd.DataFrame(rows)
    return df


def merge_china_metrics(base_df: pd.DataFrame, china_csv_path: str) -> pd.DataFrame:
    """
    Merge in China-specific metrics from a local CSV.

    The CSV should have columns:
    - iso3
    - china_trade_share_pct
    - china_debt_stock_pct_gdp

    Returns a merged DataFrame.
    """
    try:
        china_df = pd.read_csv(china_csv_path)
    except FileNotFoundError:
        print(f"WARNING: {china_csv_path} not found. Returning base DataFrame only.")
        return base_df

    expected_cols = {"iso3", "china_trade_share_pct", "china_debt_stock_pct_gdp"}
    missing = expected_cols - set(china_df.columns)
    if missing:
        print(f"WARNING: China metrics CSV missing columns: {missing}")
        print("Expected columns: iso3, china_trade_share_pct, china_debt_stock_pct_gdp")
        return base_df

    merged = base_df.merge(china_df, on="iso3", how="left")
    return merged


def main():
    print(f"Building dataset for year {YEAR}...")
    base_df = fetch_all_indicators(YEAR)
    print("Finished fetching World Bank data.")

    final_df = merge_china_metrics(base_df, CHINA_METRICS_CSV)

    final_df.to_csv(OUTPUT_CSV, index=False)
    print(f"Saved combined dataset to {OUTPUT_CSV}")


if __name__ == "__main__":
    main()
