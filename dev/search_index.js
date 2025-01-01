var documenterSearchIndex = {"docs":
[{"location":"cheb/#Chebyshev-Suite","page":"Chebyshev Suite","title":"Chebyshev Suite","text":"","category":"section"},{"location":"cheb/","page":"Chebyshev Suite","title":"Chebyshev Suite","text":"Modules = [PDESuite.ChebyshevSuite]","category":"page"},{"location":"cheb/","page":"Chebyshev Suite","title":"Chebyshev Suite","text":"Modules = [PDESuite.ChebyshevSuite]","category":"page"},{"location":"cheb/#PDESuite.ChebyshevSuite.Cheb1Vals2CoeffsCache","page":"Chebyshev Suite","title":"PDESuite.ChebyshevSuite.Cheb1Vals2CoeffsCache","text":"struct Cheb1Vals2CoeffsCache{TR}\n\nCache structure for cheb1_vals2coeffs! function to store precomputed weights, temporary arrays, and FFT plan to speed up multiple transformations of the same size.\n\nFields:\n\nw::Vector{Complex{TR}}: Weight vector of length n\ntmp::Vector{Complex{TR}}: Temporary storage vector of length 2n\ncoeffs::Vector{TR}: Result vector of Chebyshev coefficients of length n\nplan::FFTW.cFFTWPlan: FFTW plan for inverse FFT of size 2n\n\n\n\n\n\n","category":"type"},{"location":"cheb/#PDESuite.ChebyshevSuite.Cheb2Coeffs2ValsCache","page":"Chebyshev Suite","title":"PDESuite.ChebyshevSuite.Cheb2Coeffs2ValsCache","text":"Cheb2Coeffs2ValsCache{T}\n\nPre-allocated workspace for Chebyshev coefficient to values transformation. Using this cache can significantly improve performance when performing multiple transforms of the same size.\n\nFields\n\ntmp::Vector{Complex{T}}: Temporary storage for FFT computation\nvals::Vector{T}: Storage for the final result\n\nExample\n\n# Create cache for size 100 transforms\ncache = Cheb2Coeffs2ValsCache{Float64}(100)\n\n# Use cache repeatedly\nfor i in 1:1000\n    vals = cheb2_coeffs2vals!(coeffs, cache)\nend\n\n\n\n\n\n","category":"type"},{"location":"cheb/#PDESuite.ChebyshevSuite.Cheb2Vals2CoeffsCache","page":"Chebyshev Suite","title":"PDESuite.ChebyshevSuite.Cheb2Vals2CoeffsCache","text":"Cheb2Vals2CoeffsCache{T}\n\nPre-allocated workspace for Chebyshev values-to-coefficients transformations. Using this cache can significantly improve performance when performing multiple transforms of the same size.\n\nFields\n\ntmp::Vector{Complex{T}}: Temporary storage for the mirrored FFT computation\ncoeffs::Vector{T}: Storage for the final result (the Chebyshev coefficients)\n\nExample\n\n# Create cache for size-100 transforms\ncache = Cheb2Vals2CoeffsCache{Float64}(100)\n\n# Reuse the cache for multiple transforms\nfor i in 1:1000\n    some_new_vals = rand(100)  # or your own data\n    coeffs = cheb2_vals2coeffs!(some_new_vals, cache)\nend\n\n\n\n\n\n","category":"type"},{"location":"cheb/#PDESuite.ChebyshevSuite.bary-Union{Tuple{VT3}, Tuple{VT2}, Tuple{VT1}, Tuple{TR}, Tuple{VT1, VT2, VT3, TR}} where {TR<:AbstractFloat, VT1<:AbstractVector{TR}, VT2<:AbstractVector{TR}, VT3<:AbstractVector{TR}}","page":"Chebyshev Suite","title":"PDESuite.ChebyshevSuite.bary","text":"bary(w::VT1, x::VT2, f::VT3, x0::TR) where {\n    TR<:AbstractFloat,\n    VT1<:AbstractVector{TR},\n    VT2<:AbstractVector{TR},\n    VT3<:AbstractVector{TR},\n}\n\nEvaluate a polynomial interpolant using the barycentric interpolation formula.\n\nArguments\n\nw: Vector of barycentric weights\nx: Vector of interpolation points (typically Chebyshev points)\nf: Vector of function values at interpolation points\nx0: Point at which to evaluate the interpolant\n\nReturns\n\nInterpolated value at x0\n\nMathematical Details\n\nThe barycentric interpolation formula is:\n\np(x) = begincases\nf_j  textif  x = x_j text for some  j \nfracsum_j=0^n-1 fracw_jx-x_jf_jsum_j=0^n-1 fracw_jx-x_j  textotherwise\nendcases\n\nThis formula provides a numerically stable way to evaluate the Lagrange interpolation polynomial. When used with Chebyshev points and their corresponding barycentric weights, it gives optimal interpolation properties.\n\nExamples\n\n# Set up interpolation points and weights\nn = 10\nx = cheb2_pts(Float64, n)\nw = cheb2_barywts(Float64, n)\n\n# Function to interpolate\nf = sin.(π .* x)\n\n# Evaluate interpolant at a point\nx0 = 0.5\ny = bary(w, x, f, x0)\n\nReference\n\nSalzer [Sal72]\nTrefethen [Tre19]\nchebfun/@chebtech2/bary.m at master · chebfun/chebfun\n\nSee also: cheb1_barywts, cheb1_pts, cheb2_barywts, cheb2_pts\n\n\n\n\n\n","category":"method"},{"location":"cheb/#PDESuite.ChebyshevSuite.cheb1_angles-Union{Tuple{TI}, Tuple{TR}, Tuple{Type{TR}, TI}} where {TR<:AbstractFloat, TI<:Integer}","page":"Chebyshev Suite","title":"PDESuite.ChebyshevSuite.cheb1_angles","text":"cheb1_angles([TR=Float64], n::Integer)\n\nCompute angles for Chebyshev points of the first kind.\n\nArguments\n\nTR: Type parameter for the angles (e.g., Float64)\nn: Number of points\n\nReturns\n\nVector of n angles in [0,π], ordered decreasing\n\nMathematical Details\n\ntheta_k = frac(2k + 1)pi2n quad k = n-1ldots0\n\nThese angles generate first-kind Chebyshev points via: xk = -cos(θk)\n\n\n\n\n\n","category":"method"},{"location":"cheb/#PDESuite.ChebyshevSuite.cheb1_barywts-Union{Tuple{TI}, Tuple{TR}, Tuple{Type{TR}, TI}} where {TR<:AbstractFloat, TI<:Integer}","page":"Chebyshev Suite","title":"PDESuite.ChebyshevSuite.cheb1_barywts","text":"cheb1_barywts([TR=Float64], n::Integer)\n\nCompute the barycentric weights for Chebyshev points of the first kind.\n\nArguments\n\nTR: Type parameter for the weights (e.g., Float64)\nn: Number of points\n\nReturns\n\nVector of n barycentric weights\n\nMathematical Details\n\nFor Chebyshev points of the first kind, the barycentric weights are:\n\nw_j = (-1)^j sinleft(frac(2j+1)pi2nright) quad j = 0ldotsn-1\n\nThese weights provide optimal stability for barycentric interpolation at Chebyshev points of the first kind.\n\nSee also: bary, cheb1_pts\n\n\n\n\n\n","category":"method"},{"location":"cheb/#PDESuite.ChebyshevSuite.cheb1_coeffs2vals-Union{Tuple{VT}, Tuple{TR}} where {TR<:AbstractFloat, VT<:AbstractVector{TR}}","page":"Chebyshev Suite","title":"PDESuite.ChebyshevSuite.cheb1_coeffs2vals","text":"cheb1_coeffs2vals(coeffs::AbstractVector{<:AbstractFloat}) -> Vector\ncheb1_coeffs2vals!(coeffs, cache::Cheb1Coeffs2ValsCache) -> Vector\n\nConvert Chebyshev coefficients of the first kind to values at Chebyshev nodes.\n\nPerformance Guide\n\nFor best performance, especially in loops or repeated calls:\n\nCreate a cache: cache = Cheb1Coeffs2ValsCache{Float64}(n)\nUse the in-place version: cheb1_coeffs2vals!(coeffs, cache)\n\nArguments\n\ncoeffs::AbstractVector{<:AbstractFloat}: Chebyshev coefficients in descending order\ncache::Cheb1Coeffs2ValsCache: Pre-allocated workspace (for in-place version)\n\nMathematical Background\n\nThe function implements the transform from coefficient space to physical space for Chebyshev polynomials of the first kind Tₙ(x). The transformation:\n\nUses the relationship between Chebyshev polynomials and cosine series\nApplies a type-III discrete cosine transform via FFT\nPreserves polynomial symmetries:\nEven coefficients produce even functions\nOdd coefficients produce odd functions\n\nImplementation Details\n\nComputes weights w[k] = exp(-ikπ/(2n))/2\nApplies special treatment for endpoints\nUses FFT for efficient computation\nEnforces symmetry properties\n\nExamples\n\n# Convert a constant function\njulia> cheb1_coeffs2vals([1.0])\n1-element Vector{Float64}:\n 1.0\n\n# Convert linear coefficients\njulia> cheb1_coeffs2vals([1.0, 2.0])\n2-element Vector{Float64}:\n  3.0\n -1.0\n\n# Convert quadratic coefficients\njulia> cheb1_coeffs2vals([1.0, 0.0, -0.5])\n3-element Vector{Float64}:\n  0.5\n -0.5\n  0.5\n\nReferences\n\nTrefethen, L. N. (2000). Spectral Methods in MATLAB. SIAM.\nMason, J. C., & Handscomb, D. C. (2002). Chebyshev Polynomials. Chapman & Hall/CRC.\nBoyd, J. P. (2001). Chebyshev and Fourier Spectral Methods. Dover.\n\nSee also: cheb2_coeffs2vals\n\n\n\n\n\n","category":"method"},{"location":"cheb/#PDESuite.ChebyshevSuite.cheb1_pts-Union{Tuple{TI}, Tuple{TR}, Tuple{Type{TR}, TI}} where {TR<:AbstractFloat, TI<:Integer}","page":"Chebyshev Suite","title":"PDESuite.ChebyshevSuite.cheb1_pts","text":"cheb1_pts([TR=Float64], n::Integer)\ncheb1_pts([TR=Float64], n::Integer, x_min::TR, x_max::TR)\n\nGenerate Chebyshev points of the first kind.\n\nArguments\n\nTR: Type parameter for the grid points (e.g., Float64)\nn: Number of points\nx_min: (Optional) Lower bound of the mapped interval\nx_max: (Optional) Upper bound of the mapped interval\n\nReturns\n\nVector of n Chebyshev points of the first kind\n\nMathematical Details\n\nFor the standard interval [-1,1]: x_k = -cosleft(frac(2k + 1)pi2nright) quad k = 01ldotsn-1\n\nFor mapped interval [xmin,xmax]: x_mapped = fracx_max + x_min2 + fracx_min - x_max2x_k\n\nNotes\n\nChebyshev points of the first kind are the roots of Chebyshev polynomials T_n(x). The convenience methods with Integer arguments default to Float64 precision.\n\nExamples\n\n# Generate 5 points on [-1,1]\nx = cheb1_pts(Float64, 5)\nx = cheb1_pts(5)  # Same as above\n\n# Generate 5 points mapped to [0,1]\nx = cheb1_pts(Float64, 5, 0.0, 1.0)\nx = cheb1_pts(5, 0.0, 1.0)  # Same as above\n\nSee also: cheb1_angles, cheb2_pts\n\n\n\n\n\n","category":"method"},{"location":"cheb/#PDESuite.ChebyshevSuite.cheb1_quad_wts-Union{Tuple{TI}, Tuple{TR}, Tuple{Type{TR}, TI}} where {TR<:AbstractFloat, TI<:Integer}","page":"Chebyshev Suite","title":"PDESuite.ChebyshevSuite.cheb1_quad_wts","text":"cheb1_quad_wts([TR=Float64], n::Integer)\n\nCompute quadrature weights for Chebyshev points of the first kind.\n\nArguments\n\nTR: Type parameter for the weights (e.g., Float64)\nn: Number of points\n\nReturns\n\nVector of n weights for Chebyshev quadrature\n\nMathematical Background\n\nFor a function expressed in the Chebyshev basis:\n\nf(x) = sum_k=0^n c_k T_k(x)\n\nThe definite integral can be expressed as:\n\nint_-1^1 f(x)dx = mathbfv^Tmathbfc\n\nwhere mathbfv contains the integrals of Chebyshev polynomials:\n\nv_k = int_-1^1 T_k(x)dx = begincases\nfrac21-k^2  k text even \n0  k text odd\nendcases\n\nThe quadrature weights mathbfw satisfy:\n\nint_-1^1 f(x)dx approx sum_j=1^n w_j f(x_j)\n\nAlgorithm\n\nUses Waldvogel's algorithm (2006) with modifications by Nick Hale:\n\nCompute exact integrals of even-indexed Chebyshev polynomials\nMirror the sequence for DCT via FFT\nApply inverse FFT\nAdjust boundary weights\n\nEdge Cases\n\nn = 0: Returns empty vector\nn = 1: Returns [2.0]\nn ≥ 2: Returns full set of weights\n\nExamples\n\n# Compute weights for 5-point quadrature\nw = cheb1_quad_wts(5)\n\n# Integrate sin(x) from -1 to 1\nx = cheb1_pts(5)\nf = sin.(x)\nI = dot(w, f)  # ≈ 0\n\nReferences\n\nWaldvogel [Wal06]\nFast Clenshaw-Curtis Quadrature - File Exchange - MATLAB Central\n\n\n\n\n\n","category":"method"},{"location":"cheb/#PDESuite.ChebyshevSuite.cheb1_vals2coeffs!-Union{Tuple{VT}, Tuple{TR}, Tuple{VT, PDESuite.ChebyshevSuite.Cheb1Vals2CoeffsCache{TR}}} where {TR<:AbstractFloat, VT<:AbstractVector{TR}}","page":"Chebyshev Suite","title":"PDESuite.ChebyshevSuite.cheb1_vals2coeffs!","text":"cheb1_vals2coeffs!(values::AbstractVector{<:AbstractFloat},\n                   cache::Cheb1Vals2CoeffsCache{TR}) where {TR}\n\nIn-place version of cheb1_vals2coeffs that uses a cache for efficiency.\n\nComputes the Chebyshev coefficients corresponding to the given values at Chebyshev points of the first kind, storing the result in cache.coeffs.\n\nArguments\n\nvalues: Vector of function values at Chebyshev points of the first kind.\ncache: An instance of Cheb1Vals2CoeffsCache for storing precomputed data          and temporary arrays.\n\nReturns\n\nThe vector cache.coeffs, containing the Chebyshev coefficients.\n\n\n\n\n\n","category":"method"},{"location":"cheb/#PDESuite.ChebyshevSuite.cheb1_vals2coeffs-Union{Tuple{VT}, Tuple{TR}} where {TR<:AbstractFloat, VT<:AbstractVector{TR}}","page":"Chebyshev Suite","title":"PDESuite.ChebyshevSuite.cheb1_vals2coeffs","text":"cheb1_vals2coeffs(values::AbstractVector{<:AbstractFloat})\n\nConvert values at Chebyshev points of the first kind to Chebyshev coefficients.\n\nGiven a vector values of length n containing function values at Chebyshev points of the first kind, this function returns a vector coeffs of Chebyshev coefficients  such that the Chebyshev series (of the first kind) interpolates the data.\n\nThis function creates and caches computation resources internally and calls cheb1_vals2coeffs! for the actual computation.\n\nExamples\n\ncoeffs = cheb1_vals2coeffs(values)\n\nReferences\n\nSection 4.7 of \"Chebyshev Polynomials\" by Mason & Handscomb, Chapman & Hall/CRC (2003).\n\n\n\n\n\n","category":"method"},{"location":"cheb/#PDESuite.ChebyshevSuite.cheb2_angles-Union{Tuple{TI}, Tuple{TR}, Tuple{Type{TR}, TI}} where {TR<:AbstractFloat, TI<:Integer}","page":"Chebyshev Suite","title":"PDESuite.ChebyshevSuite.cheb2_angles","text":"cheb2_angles([TR=Float64], n::Integer)\n\nCompute angles for Chebyshev points of the second kind.\n\nArguments\n\nTR: Type parameter for the angles (e.g., Float64)\nn: Number of points\n\nReturns\n\nVector of n angles in [0,π], ordered decreasing\nEmpty vector if n=0\n[π/2] if n=1\n\nMathematical Details\n\nFor n > 1: theta_k = frackpin-1 quad k = n-1ldots0\n\nThese angles generate second-kind Chebyshev points via: xk = -cos(θk)\n\n\n\n\n\n","category":"method"},{"location":"cheb/#PDESuite.ChebyshevSuite.cheb2_asmat-Union{Tuple{TI}, Tuple{TR}, Tuple{Type{TR}, TI}} where {TR<:AbstractFloat, TI<:Integer}","page":"Chebyshev Suite","title":"PDESuite.ChebyshevSuite.cheb2_asmat","text":"cheb2_asmat([TR=Float64], n::Integer)\n\nGenerate the analysis and synthesis matrices for Chebyshev spectral methods.\n\nArguments\n\nTR: Type parameter for the matrix elements (e.g., Float64)\nn: Size of the matrices (n×n)\n\nReturns\n\nTuple{Matrix{TR}, Matrix{TR}}: A tuple containing:\nAnalysis matrix A (n×n)\nSynthesis matrix S (n×n)\n\nMathematical Background\n\nThe analysis and synthesis matrices are used for transforming between physical and spectral spaces in Chebyshev spectral methods.\n\nFor a function f(x) evaluated at Chebyshev points, these matrices allow:\n\nTransformation to spectral coefficients: hatf = Af\nTransformation back to physical space: f = Shatf\n\nThe matrices are constructed using:\n\nS_ij = epsilon_j cosleft(fracpi i jN-1right)\n\nA_ji = frac2c_ic_jN-1S_ij\n\nwhere:\n\nc_k = begincases 12  k=0 text or  k=N-1  1  textotherwise endcases\nepsilon_j = (-1)^j\nij = 0ldotsN-1\n\nExamples\n\n# Generate 8×8 analysis and synthesis matrices with Float64 precision\nA, S = cheb2_asmat(Float64, 8)\n\n# Transform function values to spectral coefficients\nf_values = [sin(x) for x in cheb2_pts(Float64, 8)]\nf_coeffs = A * f_values\n\n# Transform back to physical space\nf_recovered = S * f_coeffs\n\nSee also: cheb2_pts\n\n\n\n\n\n","category":"method"},{"location":"cheb/#PDESuite.ChebyshevSuite.cheb2_barywts-Union{Tuple{TI}, Tuple{TR}, Tuple{Type{TR}, TI}} where {TR<:AbstractFloat, TI<:Integer}","page":"Chebyshev Suite","title":"PDESuite.ChebyshevSuite.cheb2_barywts","text":"cheb2_barywts([TR=Float64], n::Integer)\n\nCompute the barycentric weights for Chebyshev points of the second kind.\n\nArguments\n\nTR: Type parameter for the weights (e.g., Float64)\nn: Number of points\n\nReturns\n\nVector of n barycentric weights\n\nMathematical Details\n\nFor Chebyshev points of the second kind, the barycentric weights are:\n\nw_j = (-1)^j delta_j quad j = 0ldotsn-1\n\nwhere delta_j is defined as:\n\ndelta_j = begincases\n12  j = 0 text or  j = n-1 \n1  textotherwise\nendcases\n\nThese weights are optimized for numerical stability and efficiency in the barycentric interpolation formula.\n\nSee also: bary, cheb2_pts\n\n\n\n\n\n","category":"method"},{"location":"cheb/#PDESuite.ChebyshevSuite.cheb2_coeffs2vals-Union{Tuple{VT}, Tuple{TR}} where {TR<:AbstractFloat, VT<:AbstractVector{TR}}","page":"Chebyshev Suite","title":"PDESuite.ChebyshevSuite.cheb2_coeffs2vals","text":"cheb2_coeffs2vals(coeffs::AbstractVector{<:AbstractFloat}) -> Vector\ncheb2_coeffs2vals!(coeffs, cache::Cheb2Coeffs2ValsCache) -> Vector\n\nConvert Chebyshev coefficients of the second kind to values at Chebyshev nodes using a DCT-I equivalent transform.\n\nPerformance Guide\n\nFor best performance, especially in loops or repeated calls:\n\nCreate a cache: cache = Cheb2Coeffs2ValsCache{Float64}(n)\nUse the in-place version: cheb2_coeffs2vals!(coeffs, cache)\n\nThis avoids repeated memory allocations and can be significantly faster.\n\nExamples\n\n# Single transform (allocating version)\njulia> v = cheb2_coeffs2vals([1.0, 2.0])\n\n# Multiple transforms (cached version for better performance)\njulia> cache = Cheb2Coeffs2ValsCache{Float64}(2)\njulia> for coeffs in coefficient_arrays\n           v = cheb2_coeffs2vals!(coeffs, cache)\n           # ... use v ...\n       end\n\nArguments\n\ncoeffs::AbstractVector{<:AbstractFloat}: Vector of Chebyshev coefficients in descending order\ncache::Cheb2Coeffs2ValsCache: Pre-allocated workspace (for in-place version)\n\nReturns\n\nVector of values at Chebyshev nodes of the second kind: cheb2_pts\n\nCache Creation\n\n# Create a cache for size n transforms\ncache = Cheb2Coeffs2ValsCache{Float64}(n)\n\nMathematical Background\n\nThe function implements the transform from coefficient space to physical space for Chebyshev polynomials of the second kind U_n(x). The transformation preserves symmetries:\n\nEven coefficients map to even functions\nOdd coefficients map to odd functions\n\nImplementation Details\n\nScales interior coefficients by 1/2\nMirrors coefficients and applies FFT\nEnforces even/odd symmetries in the result\n\nReferences\n\nTrefethen, L. N. (2000). Spectral Methods in MATLAB. SIAM.\nBoyd, J. P. (2001). Chebyshev and Fourier Spectral Methods. Dover.\n\nSee also: cheb1_coeffs2vals, Cheb2Coeffs2ValsCache\n\n\n\n\n\n","category":"method"},{"location":"cheb/#PDESuite.ChebyshevSuite.cheb2_coeffs_intmat-Union{Tuple{TI}, Tuple{TR}, Tuple{Type{TR}, TI}} where {TR<:AbstractFloat, TI<:Integer}","page":"Chebyshev Suite","title":"PDESuite.ChebyshevSuite.cheb2_coeffs_intmat","text":"cheb2_coeffs_intmat([TR=Float64], n::Integer)\ncheb2_coeffs_intmat([TR=Float64], n::Integer, x_min::TR, x_max::TR)\n\nGenerate the Chebyshev coefficient integration matrix for spectral integration.\n\nArguments\n\nTR: Type parameter for the matrix elements (e.g., Float64)\nn: Size of the matrix (n×n)\nx_min: (Optional) Lower bound of the integration interval\nx_max: (Optional) Upper bound of the integration interval\n\nReturns\n\nMatrix{TR}: The integration matrix B (n×n)\n\nMathematical Background\n\nThe integration matrix B operates on Chebyshev spectral coefficients to compute the coefficients of the indefinite integral. For a function expressed in the  Chebyshev basis:\n\nf(x) = sum_k=0^N-1 a_k T_k(x)\n\nThe indefinite integral's coefficients b_k in:\n\nint f(x)dx = sum_k=0^N-1 b_k T_k(x) + C\n\nare computed using the matrix B: b = Ba\n\nThe matrix elements are derived from the integration relation of Chebyshev polynomials:\n\nint T_n(x)dx = frac12left(fracT_n+1(x)n+1 - fracT_n-1(x)n-1right)\n\nWhen x_min and x_max are provided, the matrix is scaled for integration over [xmin, xmax].\n\nExamples\n\n# Generate 8×8 integration matrix for [-1,1]\nB = cheb2_coeffs_intmat(Float64, 8)\n\n# Get Chebyshev coefficients of sin(x) using cheb2_asmat\nA, _ = cheb2_asmat(Float64, 8)\nx = cheb2_pts(Float64, 8)\nf = sin.(x)\na = A * f  # Chebyshev coefficients of sin(x)\n\n# Compute coefficients of indefinite integral\nb = B * a  # Chebyshev coefficients of -cos(x) + C\n\nSee also: cheb2_pts, cheb2_asmat\n\n\n\n\n\n","category":"method"},{"location":"cheb/#PDESuite.ChebyshevSuite.cheb2_intmat-Union{Tuple{TI}, Tuple{TR}, Tuple{Type{TR}, TI}} where {TR<:AbstractFloat, TI<:Integer}","page":"Chebyshev Suite","title":"PDESuite.ChebyshevSuite.cheb2_intmat","text":"cheb2_intmat([TR=Float64], n::Integer)\ncheb2_intmat([TR=Float64], n::Integer, x_min::TR, x_max::TR)\n\nGenerate the Chebyshev integration matrix that operates directly on function values.\n\nArguments\n\nTR: Type parameter for the matrix elements (e.g., Float64)\nn: Size of the matrix (n×n)\nx_min: (Optional) Lower bound of the integration interval\nx_max: (Optional) Upper bound of the integration interval\n\nReturns\n\nMatrix{TR}: The integration matrix that operates on function values\n\nMathematical Background\n\nThis matrix directly computes the indefinite integral of a function from its values at Chebyshev points. For a function f(x), the integral is computed as:\n\nint f(x)dx = mathbfIf\n\nwhere mathbfI = S B A is the integration matrix composed of:\n\nA: Analysis matrix (transform to spectral coefficients)\nB: Coefficient integration matrix\nS: Synthesis matrix (transform back to physical space)\n\nThis composition allows integration in physical space through:\n\nTransform to spectral space (A)\nIntegrate coefficients (B)\nTransform back to physical space (S)\n\nExamples\n\n# Generate 8×8 integration matrix for [-1,1]\nI = cheb2_intmat(Float64, 8)\n\n# Get function values at Chebyshev points\nx = cheb2_pts(Float64, 8)\nf = sin.(x)\n\n# Compute indefinite integral (-cos(x) + C)\nF = I * f\n\n# Integration matrix for [0,π]\nI_scaled = cheb2_intmat(Float64, 8, 0.0, π)\n\nSee also: cheb2_coeffs_intmat, cheb2_asmat, cheb2_pts\n\n\n\n\n\n","category":"method"},{"location":"cheb/#PDESuite.ChebyshevSuite.cheb2_pts-Union{Tuple{TI}, Tuple{TR}, Tuple{Type{TR}, TI}} where {TR<:AbstractFloat, TI<:Integer}","page":"Chebyshev Suite","title":"PDESuite.ChebyshevSuite.cheb2_pts","text":"cheb2_pts([TR=Float64], n::Integer)\ncheb2_pts([TR=Float64], n::Integer, x_min::TR, x_max::TR)\n\nGenerate Chebyshev points of the second kind.\n\nArguments\n\nTR: Type parameter for the grid points (e.g., Float64)\nn: Number of points\nx_min: (Optional) Lower bound of the mapped interval\nx_max: (Optional) Upper bound of the mapped interval\n\nReturns\n\nVector of n Chebyshev points of the second kind\n\nMathematical Details\n\nFor the standard interval [-1,1]: x_k = -cosleft(frackpin-1right) quad k = 01ldotsn-1\n\nFor mapped interval [xmin,xmax]: x_mapped = fracx_max + x_min2 + fracx_min - x_max2x_k\n\nNotes\n\nChebyshev points of the second kind are the extrema of Chebyshev polynomials T_n(x). These points include the endpoints, making them suitable for boundary value problems. The convenience methods with Integer arguments default to Float64 precision.\n\nExamples\n\n# Generate 5 points on [-1,1]\nx = cheb2_pts(Float64, 5)\nx = cheb2_pts(5)  # Same as above\n\n# Generate 5 points mapped to [0,π]\nx = cheb2_pts(Float64, 5, 0.0, π)\nx = cheb2_pts(5, 0.0, π)  # Same as above\n\nSee also: cheb2_angles, cheb1_pts\n\n\n\n\n\n","category":"method"},{"location":"cheb/#PDESuite.ChebyshevSuite.cheb2_quad_wts-Union{Tuple{TI}, Tuple{TR}, Tuple{Type{TR}, TI}} where {TR<:AbstractFloat, TI<:Integer}","page":"Chebyshev Suite","title":"PDESuite.ChebyshevSuite.cheb2_quad_wts","text":"cheb2_quad_wts([TR=Float64], n::Integer)\n\nCompute quadrature weights for Chebyshev points of the second kind (Clenshaw-Curtis quadrature).\n\nArguments\n\nTR: Type parameter for the weights (e.g., Float64)\nn: Number of points\n\nReturns\n\nVector of n weights for Clenshaw-Curtis quadrature\n\nMathematical Background\n\nFor a function expressed in the Chebyshev basis:\n\nf(x) = sum_k=0^n c_k T_k(x)\n\nThe definite integral can be expressed as:\n\nint_-1^1 f(x)dx = mathbfv^Tmathbfc\n\nwhere mathbfv contains the integrals of Chebyshev polynomials:\n\nv_k = int_-1^1 T_k(x)dx = begincases\nfrac21-k^2  k text even \n0  k text odd\nendcases\n\nThe quadrature weights mathbfw satisfy:\n\nint_-1^1 f(x)dx approx sum_j=1^n w_j f(x_j)\n\nAlgorithm\n\nUses Waldvogel's algorithm (2006) with modifications by Nick Hale:\n\nCompute exact integrals of even-indexed Chebyshev polynomials\nMirror the sequence for DCT via FFT\nApply inverse FFT\nAdjust boundary weights\n\nEdge Cases\n\nn = 0: Returns empty vector\nn = 1: Returns [2.0]\nn ≥ 2: Returns full set of weights\n\nExamples\n\n# Compute weights for 5-point quadrature\nw = cheb2_quad_wts(5)\n\n# Integrate sin(x) from -1 to 1\nx = cheb2_pts(5)\nf = sin.(x)\nI = dot(w, f)  # ≈ 0\n\nReferences\n\nWaldvogel [Wal06]\nFast Clenshaw-Curtis Quadrature - File Exchange - MATLAB Central\n\n\n\n\n\n","category":"method"},{"location":"cheb/#PDESuite.ChebyshevSuite.cheb2_vals2coeffs-Union{Tuple{AbstractVector{T}}, Tuple{T}} where T<:AbstractFloat","page":"Chebyshev Suite","title":"PDESuite.ChebyshevSuite.cheb2_vals2coeffs","text":"cheb2_vals2coeffs(vals::AbstractVector{T}) where T<:AbstractFloat\n\nConvert values sampled at Chebyshev points of the second kind into their corresponding Chebyshev coefficients. This function allocates a cache internally to perform the  inverse Discrete Cosine Transform of Type I (mirrored FFT) and returns a new array  containing the Chebyshev coefficients.\n\nDescription\n\nGiven an input vector vals of length n representing function values at Chebyshev points of the second kind, cheb2_vals2coeffs computes the Chebyshev coefficients c such that:\n\nf(x) = c[1]*T₀(x) + c[2]*T₁(x) + ... + c[n]*Tₙ₋₁(x)\n\nwhere Tₖ(x) are the Chebyshev polynomials of the first kind. Internally, this function:\n\nDetects trivial cases (e.g. n <= 1).\nConstructs a mirror of the input values to emulate an inverse DCT using FFT.\nPerforms an inverse FFT and rescales the interior coefficients by 2.\nEnforces exact symmetries (even/odd) where detected.\n\nExample\n\nvals = [0.0, 1.0, 2.0, 1.0, 0.0]  # Example of 5 sample values\ncoeffs = cheb2_vals2coeffs(vals)\n\n\n\n\n\n","category":"method"},{"location":"cheb/#PDESuite.ChebyshevSuite.runtests-Tuple","page":"Chebyshev Suite","title":"PDESuite.ChebyshevSuite.runtests","text":"PDESuite.ChebyshevSuite.runtests(pattern...; kwargs...)\n\nEquivalent to ReTest.retest(PDESuite.ChebyshevSuite, pattern...; kwargs...). This function is defined automatically in any module containing a @testset, possibly nested within submodules.\n\n\n\n\n\n","category":"method"},{"location":"cheb/","page":"Chebyshev Suite","title":"Chebyshev Suite","text":"B. Fornberg. Generation of finite difference formulas on arbitrarily spaced grids. Mathematics of computation 51, 699–706 (1988).\n\n\n\nB. Fornberg. Classroom Note:Calculation of Weights in Finite Difference Formulas. SIAM Review 40, 685–691 (1998), arXiv:https://doi.org/10.1137/S0036144596322507.\n\n\n\nB. Fornberg. An algorithm for calculating Hermite-based finite difference weights. IMA Journal of Numerical Analysis 41, 801–813 (2021).\n\n\n\nH. E. Salzer. Lagrangian interpolation at the Chebyshev points xn, nuequiv cos (nupi/n), nu= 0 (1) n; some unnoted advantages. The Computer Journal 15, 156–159 (1972).\n\n\n\nL. N. Trefethen. Approximation Theory and Approximation Practice, Extended Edition (Society for Industrial and Applied Mathematics, Philadelphia, PA, 2019), arXiv:https://epubs.siam.org/doi/pdf/10.1137/1.9781611975949.\n\n\n\nJ. Waldvogel. Fast construction of the Fejér and Clenshaw–Curtis quadrature rules. BIT Numerical Mathematics 46, 195–202 (2006).\n\n\n\n","category":"page"},{"location":"fdm/#Finite-Difference-Suite","page":"Finite Difference Suite","title":"Finite Difference Suite","text":"","category":"section"},{"location":"fdm/","page":"Finite Difference Suite","title":"Finite Difference Suite","text":"Modules = [PDESuite.FiniteDifferenceSuite]","category":"page"},{"location":"fdm/","page":"Finite Difference Suite","title":"Finite Difference Suite","text":"Modules = [PDESuite.FiniteDifferenceSuite]","category":"page"},{"location":"fdm/#PDESuite.FiniteDifferenceSuite.fdm_grid-Union{Tuple{TR}, Tuple{Type{TR}, TR, TR, TR}} where TR<:AbstractFloat","page":"Finite Difference Suite","title":"PDESuite.FiniteDifferenceSuite.fdm_grid","text":"fdm_grid(::Type{TR}, x_min::TR, x_max::TR, dx::TR) where {TR<:AbstractFloat}\n\nGenerate a uniform grid for finite difference methods.\n\nArguments\n\nTR: Type parameter for the grid points (e.g., Float64)\nx_min: Lower bound of the interval\nx_max: Upper bound of the interval\ndx: Grid spacing\n\nReturns\n\nVector of n uniformly spaced points, where n = round((xmax - xmin)/dx) + 1\n\nMathematical Details\n\nThe grid points are generated as:\n\nx_i = x_min + (i-1)dx quad i = 1ldotsn\n\nwhere n is chosen to ensure the grid covers [xmin, xmax] with spacing dx.\n\nNotes\n\nThe function ensures that x_max is accurately represented within floating-point precision\nThe actual number of points is computed to maintain uniform spacing\nThe final point may differ from x_max by at most machine epsilon\n\nExamples\n\n# Generate grid with spacing 0.1 on [0,1]\nx = fdm_grid(Float64, 0.0, 1.0, 0.1)\n\n# Generate grid with 100 points on [-1,1]\ndx = 2.0/99  # To get exactly 100 points\nx = fdm_grid(Float64, -1.0, 1.0, dx)\n\n\n\n\n\n","category":"method"},{"location":"fdm/#PDESuite.FiniteDifferenceSuite.fornberg_calculate_weights-Union{Tuple{VT}, Tuple{T2}, Tuple{T}, Tuple{Int64, T, VT}} where {T<:Real, T2<:Real, VT<:AbstractVector{T2}}","page":"Finite Difference Suite","title":"PDESuite.FiniteDifferenceSuite.fornberg_calculate_weights","text":"fornberg_calculate_weights([T=Float64], order::Integer, x0::Real, x::AbstractVector; \n                         dfdx::Bool=false)\n\nCalculate finite difference weights for arbitrary-order derivatives using the Fornberg algorithm.\n\nArguments\n\nT: Type parameter for the weights (defaults to type of x0)\norder: Order of the derivative to approximate\nx0: Point at which to approximate the derivative\nx: Grid points to use in the approximation\ndfdx: Whether to include first derivative values (Hermite finite differences)\n\nReturns\n\nIf dfdx == false:\n\nVector{T}: Weights for function values\n\nIf dfdx == true:\n\nTuple{Vector{T}, Vector{T}}: Weights for (function values, derivative values)\n\nMathematical Background\n\nFor a function f(x), the derivative approximation takes the form:\n\nIf dfdx == false (standard finite differences):\n\nf^(n)(x_0) approx sum_j=1^N c_j f(x_j)\n\nIf dfdx == true (Hermite finite differences):\n\nf^(n)(x_0) approx sum_j=1^N d_j f(x_j) + e_j f(x_j)\n\nRequirements\n\nFor standard finite differences: N > order\nFor Hermite finite differences: N > order/2 + 1\n\nwhere N is the length of x\n\nExamples\n\n# Standard central difference for first derivative\nx = [-1.0, 0.0, 1.0]\nw = fornberg_calculate_weights(1, 0.0, x)\n# Returns approximately [-0.5, 0.0, 0.5]\n\n# Forward difference for second derivative\nx = [0.0, 1.0, 2.0, 3.0]\nw = fornberg_calculate_weights(2, 0.0, x)\n\n# Hermite finite difference for third derivative\nx = [-1.0, 0.0, 1.0]\nw_f, w_d = fornberg_calculate_weights(3, 0.0, x, dfdx=true)\n\nReferences\n\nFornberg [For88]\nFornberg [For21]\nFornberg [For98]\nMethodOfLines.jl/src/discretization/schemes/fornbergcalculateweights.jl at master · SciML/MethodOfLines.jl\nprecision - Numerical derivative and finite difference coefficients: any update of the Fornberg method? - Computational Science Stack Exchange\n\nNotes\n\nThe implementation includes a stability correction for higher-order derivatives\nFor first derivatives (order=1), the weights sum to zero\nThe algorithm handles both uniform and non-uniform grids\nWhen using Hermite finite differences, fewer points are needed but derivatives must be available\n\nSee also: fdm_grid\n\n\n\n\n\n","category":"method"},{"location":"fdm/#PDESuite.FiniteDifferenceSuite.runtests-Tuple","page":"Finite Difference Suite","title":"PDESuite.FiniteDifferenceSuite.runtests","text":"PDESuite.FiniteDifferenceSuite.runtests(pattern...; kwargs...)\n\nEquivalent to ReTest.retest(PDESuite.FiniteDifferenceSuite, pattern...; kwargs...). This function is defined automatically in any module containing a @testset, possibly nested within submodules.\n\n\n\n\n\n","category":"method"},{"location":"fdm/","page":"Finite Difference Suite","title":"Finite Difference Suite","text":"","category":"page"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = PDESuite","category":"page"},{"location":"#PDESuite","page":"Home","title":"PDESuite","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Documentation for PDESuite.","category":"page"},{"location":"","page":"Home","title":"Home","text":"warning: AI-Generated Documentation\nMost of the documentation in this package was generated with the assistance of AI. If you find any issues or areas that need clarification, please open an issue on GitHub.","category":"page"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"","page":"Home","title":"Home","text":"Modules = [PDESuite]","category":"page"},{"location":"#PDESuite.runtests-Tuple","page":"Home","title":"PDESuite.runtests","text":"PDESuite.runtests(pattern...; kwargs...)\n\nEquivalent to ReTest.retest(PDESuite, pattern...; kwargs...). This function is defined automatically in any module containing a @testset, possibly nested within submodules.\n\n\n\n\n\n","category":"method"}]
}
