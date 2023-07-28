# hra-ct-summaries-mx-spatial-data
Cell Type summary files for multiplexed (mx) antibody-based imaging data.

## Directory Description
Each directory in the root directory corresponds to one type of data collection. Within each directory, there are two directories containing CSV files named by HuBMAP IDs of those datasets:
* cell_coordinates: This contains all CSVs with individual cell coordinates (x,y) with cell type label. The coordinates belong to cell location within a tissue image.
* cell_type_counts: This contains all CSVs with total cell type counts per cell type for each dataset.

## Dataset Description

| Directory Name | Description | Number of HuBMAP Datasets | CT Summary Source |
| ------------- | ------------- | ------------- | ------------- |
| intestine_omap_2_0001 | CODEX Datasets for large and small intestine from John Hickey using OMAP-2| 64 | [Dryad dataset from data provider](https://doi.org/10.5061/dryad.pk0p2ngrf)  |