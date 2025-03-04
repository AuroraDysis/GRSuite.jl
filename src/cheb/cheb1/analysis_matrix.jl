"""
    cheb1_analysis_matrix([TF=Float64], n::Integer) where {TF<:AbstractFloat}

Construct the analysis matrix A that transforms function values at Chebyshev points of the 1st kind to Chebyshev coefficients.

# Arguments
- `TF`: Element type (defaults to Float64)
- `n`: Number of points/coefficients
"""
function cheb1_analysis_matrix(::Type{TF}, n::Integer) where {TF<:AbstractFloat}
    A = Array{TF,2}(undef, n, n)
    op = ChebyshevFirstKindAnalysis{TF}(n)
    @inbounds for i in 1:n
        A[:, i] = op(OneElement(one(TF), i, n))
    end
    return A
end

function cheb1_analysis_matrix(n::Integer)
    return cheb1_analysis_matrix(Float64, n)
end

function _cheb_analysis_matrix(
    ::ChebyshevFirstKindNode, ::Type{TF}, n::Integer
) where {TF<:AbstractFloat}
    return cheb1_analysis_matrix(TF, n)
end

export cheb1_analysis_matrix
