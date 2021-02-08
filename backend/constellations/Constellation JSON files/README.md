README

## Details on JSON Files

The const_(mm)_ (dd) _ (yyyy).json contains all the data points needed to reproduce constellations on a plot. The format followed is:

```
{"constellations":
	[{"Name": constellation_1, "abbreviation": abrvn, "points": [data]},
	{"Name": constellation_2, "abbreviation": abrvn, "points": [data]},
	...
	]
}
```
The list of data points has further been formatted as:

```
[ [[long, lat], [long, lat], ...], [[long, lat], [long, lat], ...], ... ]
```

The outer list is the collection of all lines that make up a constellation's stick figures. The inner (2nd rung) list contains all points that constitute a single line of connected points. Each point contains the ecliptic longitude and latitude values as a tuple. The constellation abbreviations are those set by the IAU.