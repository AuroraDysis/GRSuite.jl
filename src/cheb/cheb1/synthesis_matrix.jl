
"""
    cheb1_synthesis_matrix([TF=Float64], n::Integer) where {TF<:AbstractFloat}

Construct the synthesis matrix S that transforms Chebyshev coefficients to function values at Chebyshev points of the 1st kind.

# Arguments
- `TF`: Element type (defaults to Float64)
- `n`: Number of points/coefficients
"""
function cheb1_synthesis_matrix(::Type{TF}, n::Integer) where {TF<:AbstractFloat}
    S = Array{TF,2}(undef, n, n)
    op = ChebyshevFirstKindSynthesis{TF}(n)
    @inbounds for i in 1:n
        S[:, i] = op(OneElement(one(TF), i, n))
    end
    return S
end

function cheb1_synthesis_matrix(n::Integer)
    return cheb1_synthesis_matrix(Float64, n)
end

function _cheb_synthesis_matrix(
    ::ChebyshevFirstKindNode, ::Type{TF}, n::Integer
) where {TF<:AbstractFloat}
    return cheb1_synthesis_matrix(TF, n)
end

export cheb1_synthesis_matrix
